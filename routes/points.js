const express = require('express');
const router = express.Router();
const moment = require('moment')
const {student, merit, teacher, history} = require('../models')
require('moment-timezone')
moment().tz('Asia/Seoul')

router.get('/', (req, res, next) => {
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
        let history_data = await history.findAll({
            where: {
                st_id: query.st_id
            }
        })
        history_data = await history_data.map(each_data => {
            if (each_data['date']) {
                each_data['date'] = moment(each_data['date']).format('YYYY-MM-DD')
            }
            if (each_data['work_date']) {
                each_data['work_date'] = moment(each_data['work_date']).format('YYYY-MM-DD')
            }
            if (each_data['t_id'] === 0) {
                each_data['t_id'] = ''
            }
            return each_data
        })
        await teacher.findAll().then(async teachers => {
            let teacher_id_with_name = {}
            await teachers.forEach(each_data => {
                teacher_id_with_name[each_data['key_num']] = each_data['t_name']
            })
            merits = await merits.map(each_data => {
                each_data['t_name'] = teacher_id_with_name[each_data['t_id']]
                each_data['m_date'] = moment(each_data['m_date']).format('YYYY-MM-DD')
                each_data['work_date'] = moment(each_data['work_date']).format('YYYY-MM-DD')
                return each_data
            })
            await res.render('points', {
                points: merits,
                query: query,
                student: student_data,
                history: history_data,
                title: 'PRS'
            })
        }, e => next(e))
    }, e => next(e))
})

router.get('/restore', (req, res, next) => {
    const query = {
        lot: req.query['key_num'],
        st_id: req.query['student_id'],
        type: 'merit'
    }
    if (query.lot && query.st_id) {
        const history_destination_data = {
            lot: query.lot,
            st_id: query.st_id,
            type: query.type
        }
        history.findOne({
            where: history_destination_data, raw: true
        }).then(async history_data => {
            history_data['m_date'] = await moment(history_data['date']).format('YYYY-MM-DD')
            history_data['work_date'] = await moment(history_data['work_date']).format('YYYY-MM-DD')
            history_data['m_time'] = history_data['time']
            delete history_data['key_num']
            delete history_data['lot']
            await history.destroy({
                where: history_destination_data
            })
            if (history_data['t_id'] === 0) delete history_data['t_id']
            await merit.create(history_data).then(() => {
                res.redirect(`/query/students/points?student_id=${query.st_id}`)
            }, e => next(e))
        }, e => next(e))
    } else {
        res.redirect('/')
    }
})

router.get('/delete', (req, res, next) => {
    const query = {
        key_num: req.query['key_num'],
        st_id: req.query['student_id']
    }
    if (!query.key_num || !query.st_id) {
        res.redirect('/')
    }
    merit.findOne({
        where: {
            key_num: query.key_num,
            st_id: query.st_id
        }, raw: true
    }).then(merit_data => {
        merit_data['type'] = 'merit'
        merit_data['date'] = moment(merit_data['m_date']).format('YYYY-MM-DD')
        merit_data['work_date'] = moment(merit_data['work_date']).format('YYYY-MM-DD')
        merit_data['time'] = merit_data['m_time']
        history.create(merit_data).then(() => {
            merit.destroy({
                where: {
                    key_num: query.key_num,
                    st_id: query.st_id
                }
            }).then(() => {
                res.redirect(`/query/students/points?student_id=${query.st_id}`)
            }, e => next(e))
        }, e => next(e))
    }, e => next(e))
})

module.exports = router;
