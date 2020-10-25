const express = require('express');
const router = express.Router();
const moment = require('moment')
const {student} = require('../models')
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
                query: query,
                title: `Students ( ${query.grade}-${query.ban} )`
            })
        }, e => next(e))
    } else {
        res.redirect('/query')
    }
})

module.exports = router;
