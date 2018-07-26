const express = require('express')
const app = express()
app.use(express())

const cookieparser = require('cookie-parser')
app.use(cookieparser())

const bodyparser = require('body-parser')
app.use(bodyparser())

app.set('view engine', 'ejs')

app.get('/', function(req, resp){
    resp.render('./index.ejs')
})

app.post('/text', function(req, resp){
    //code goes here
    resp.cookie('background-color', req.body.backgroundcolor);
    resp.cookie('post-color', req.body.postcolor);
    resp.cookie('font-color', req.body.fontcolor);
    console.log(req.cookies)
    
    
    resp.render('./text.ejs')
})

const port = process.env.PORT | 9090
app.listen(port)
