const express = require('express')
const server = express()
server.use(express())

const cookieparser = require('cookie-parser')
server.use(cookieparser())

const bodyparser = require('body-parser')
server.use(bodyparser())

server.set('view enging', 'ejs')

server.get('/', function(req, resp){
    resp.render('./index.ejs')
})

server.get('/text', function(req, resp){
    resp.cookie('backgroundcolor', req.query.backgroundcolor)
    resp.cookie('fontcolor', req.query.fontcolor)
    resp.cookie('postcolor', req.query.postcolor)
    
    // req.session.cookie.maxAge = 1000 * 60 * 60;
    
    resp.render('./index.ejs')
})

server.get('/preferences', function(req, resp){
    resp.render('./prefrences.ejs')
})



const port = process.env.PORT | 9090
server.listen(port)

