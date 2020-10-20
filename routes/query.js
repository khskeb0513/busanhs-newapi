const express = require('express');
const router = express.Router();
const moment = require('moment')
const {student} = require('../models')
require('moment-timezone')
moment().tz('Asia/Seoul')

router.get('/', (req, res, next) => {
    student.findAll({
        where: {
            state: 'Y'
        }
    }).then(async students => {
        const result_object = {
            '1': {
                grade: 1,
                bans: []
            },
            '2': {
                grade: 2,
                bans: []
            },
            '3': {
                grade: 3,
                bans: []
            }
        }
        await students.forEach(each_data => {
            result_object[each_data['class']]['bans'].push(each_data['ban'])
        })
        let result_array = await Object.values(result_object)
        result_array = await Promise.all(result_array.map(async each_data => {
            each_data['bans'] = [...new Set(each_data['bans'])]
            await each_data['bans'].sort((a, b) => {
                return a - b
            })
            return each_data
        }))
        await res.render('query', {
            result: result_array
        })
    })
})

module.exports = router;
