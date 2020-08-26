const express = require('express');
const router = express.Router();
const {student} = require('../models')

/* GET users listing. */
router.get('/', function (req, res, next) {
    const query = {
        name: req.query['name']
    }
    student.findAll({
        where: {
            name: query.name
        }
    }).then(r => {
        res.json(r)
    }, e => {
        console.error(e)
        res.json({
            success: false,
            payload: e.type || e
        })
    })
});

module.exports = router;
