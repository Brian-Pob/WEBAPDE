const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')

app.use(cookieparser());
app.use(bodyparser())
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, resp){
    resp.render('./form.ejs')
})

app.post('/data', function(req, resp){
    var lastname = req.body.lastname
    var firstname = req.body.firstname
    var idnum = req.body.idnum

    if(lastname !== undefined && firstname !== undefined && idnum !== undefined)
        if(req.cookies.mycookie === undefined)
            resp.cookie('mycookie', lastname+'-'+firstname+'-'+idnum)
        else
            resp.cookie('mycookie', req.cookies.mycookie+'$'+lastname+'-'+firstname+'-'+idnum)

    resp.render('./data.ejs')
})

const port = process.env.port | 9090
app.listen(port)