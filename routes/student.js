const express = require('express');
const router = express.Router();
const {student} = require('../models')

/* GET users listing. */
router.get('/student', function (req, res, next) {
    const query = {
        name: req.query['name'] || null
    }
    student.findAll({
        where: {
            name: query.name
        }
    }).then(r => {
        res.json({
            success: true,
            payload: r
        })
    }, e => {
        console.error(e)
        res.json({
            success: false,
            payload: e.type || e
        })
    })
});

module.exports = router;
