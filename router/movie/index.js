var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// database setting
var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '1234',
    database: 'node_study'
})

connection.connect()

// router
router.get('/list', function(req, res) {
    res.render('movie.ejs')
})

router.get('/', function(req, res) {
    var responseData = {}

    var query = connection.query('select title from movie', function(err, rows) {
        if(err) throw err;
        if(rows.length) {
            responseData.result = 1
            responseData.data = rows
        } else {
            responseData.result = 0
        }
        res.json(responseData)
    })
})

router.post('/', function(req, res) {
    var title = req.body.title
    var type = req.body.type
    var grade = req.body.grade
    var actor = req.body.actor

    var sql = {title, type, grade, actor}
    var query = connection.query('insert into movie set ?', sql, function(err, rows) {
        if(err) throw err
        return res.json({'result': 1})
    })
})

router.get('/:title', function(req, res) {
    var title = req.params.title
    var responseData = {}

    var query = connection.query('select * from movie where title =?', [title], function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            responseData.result = 1
            responseData.data = rows
        } else {
            responseData.result = 0
        }
        res.json(responseData)
    })
})

router.delete('/:title', function(req, res) {
    var title = req.params.title
    var responseData = {}

    var query = connection.query('delete from movie where title =?', [title], function(err, rows) {
        if(err) throw err;
        if(rows.affectedRows > 0) {
            responseData.result = 1
            responseData.data = title
        } else {
            responseData.result = 0
        }
        res.json(responseData)
    })
})

module.exports = router