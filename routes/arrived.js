const express = require('express');
const router = express.Router();
const moment = require('moment')
const {student, studentin} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op
require('moment-timezone')
moment().tz('Asia/Seoul')
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const number = (Math.floor(Math.random() * (max - min)) + min).toString()
    if (number.length === 1) {
        return '0' + number
    } else if (number.length === 2) {
        return number
    } else {
        return '47'
    }
}

router.get('/', (req, res, next) => {
    const query = {
        grade: req.query['grade'] || 0,
        ban: req.query['ban'] || 0,
        date: req.query['date'] || moment().format('YYYY-MM-DD'),
        type: req.query['type'] || 'all'
    }
    if (!query.grade && !query.ban) {
        res.redirect('/query')
    } else {
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
        }).then(async students => {
            const result_object = {}
            await students.forEach(each_data => {
                result_object[each_data['st_id']] = {}
                result_object[each_data['st_id']]['name'] = each_data['name']
                result_object[each_data['st_id']]['num'] = each_data['num']
                result_object[each_data['st_id']]['st_id'] = each_data['st_id']
            })
            await studentin.findAll({
                where: {
                    [Op.or]: students.map(each_data => {
                        return {
                            st_id: each_data['st_id'],
                            inDate: query.date
                        }
                    })
                }
            }).then(async studentins => {
                await studentins.forEach(each_data => {
                    result_object[each_data['st_id']]['studentin'] = each_data
                })
                let result_array = Object.values(result_object)
                await result_array.sort((a, b) => {
                    return a['num'] - b['num']
                })
                await res.render('arrived', {
                    studentins: result_array,
                    query: query,
                    date: query.date,
                    title: `ARMS ( ${query.grade}-${query.ban} )`
                })
            }, e => next(e))
        }, e => next(e))
    }
})

router.get('/add', (req, res, next) => {
    res.redirect('/query')
})

router.post('/add', (req, res, next) => {
    const body = {
        date: req.body['date'] || moment().format('YYYY/MM/DD'),
        'class': req.body['class'],
        ban: req.body['ban'],
        student_id: req.body['student_id']
    }
    const attend_form = (st_id) => {
        return {
            st_id: st_id,
            inDate: body.date,
            inTime: '07' + getRandomInt(33, 48) + getRandomInt(10, 50),
            "class": body['class'],
            state: 'Y',
            STD_NAME: '체크기1',
            gubun: '',
            bigo: ''
        }
    }
    const convert_data_type = (data) => {
        if (typeof data === 'string') {
            return [data]
        } else if (typeof data === 'object') {
            const set = new Set(data)
            return [...set]
        } else {
            return []
        }
    }
    const make_arrived = async () => {
        const request_array = await convert_data_type(body.student_id).map(each_id => {
            return attend_form(each_id)
        })
        await request_array.map(each_data => {
            studentin.create(each_data).then(
                () => {
                },
                (e) => next(e)
            )
        })
    }
    make_arrived().then(() => {
        res.redirect(`/query/arrived?grade=${body.class}&ban=${body.ban}&date=${body.date}`)
    })
})

router.get('/delete', (req, res, next) => {
    const query = {
        date: req.query['date'] || 'nothing',
        st_id: req.query['student_id'] || 'nothing',
        grade: req.query['class'] || 'nothing',
        ban: req.query['ban'] || 'nothing'
    }
    studentin.destroy({
        where:
            {
                inDate: query.date,
                st_id: query.st_id
            }
    }).then(() => {
        res.redirect(`/query/arrived?grade=${query.grade}&ban=${query.ban}&date=${query.date}`)
    }, e => next(e))
})

module.exports = router;
