const express = require('express');
const router = express.Router();
const moment = require('moment')
const {student, merit, teacher} = require('../models')
const {Op} = require('sequelize')
require('moment-timezone')
moment().tz('Asia/Seoul')

router.get('/', (req, res, next) => {
    const query = {
        grade: req.query['grade'],
        ban: req.query['ban']
    }
    if (query.grade && query.ban) {
        student.findAll({
            where: {
                class: query.grade,
                ban: query.ban,
                state: 'Y'
            }, order: [
                ['class', 'ASC'],
                ['ban', 'ASC'],
                ['num', 'ASC'],
                ['name', 'ASC']
            ]
        }).then(students => {
            res.render('students', {
                students: students,
                query: query
            })
        })
    } else {
        res.redirect('/query')
    }
})

router.get('/points', (req, res, next) => {
    const query = {
        st_id: req.query['student_id']
    }
    if (!query.st_id) {
        res.redirect('/')
    }
    merit.findAll({
        where: {
            st_id: query.st_id
        }
    }).then(async merits => {
        const student_data = await student.findOne({
            where: {
                st_id: query.st_id
            }
        })
        await teacher.findAll().then(async teachers => {
            let teacher_id_with_name = {}
            await teachers.forEach(each_data => {
                teacher_id_with_name[each_data['key_num']] = each_data['t_name']
            })
            merits = await merits.map(each_data => {
                each_data['t_name'] = teacher_id_with_name[each_data['t_id']]
                each_data['m_date'] = moment(Date.parse(each_data['m_date']), 'x').format('YYYY-MM-DD')
                each_data['work_date'] = moment(Date.parse(each_data['work_date']), 'x').format('YYYY-MM-DD')
                return each_data
            })
            await res.render('points', {
                points: merits,
                query: query,
                student: student_data
            })
        })
    })
})

router.get('/points/delete', (req, res, next) => {
    const query = {
        key_num: req.query['key_num'],
        st_id: req.query['student_id']
    }
    if (!query.key_num || !query.st_id) {
        res.redirect('/')
    }
    merit.destroy({
        where: {
            key_num: query.key_num,
            st_id: query.st_id
        }
    }).then(() => {
        res.redirect(`/query/students/points?student_id=${query.st_id}`)
    })
})

module.exports = router;
