const express = require('express')
const server = express()

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.use(express.json())
server.use(express.urlencoded({extended: true}))



const mongoStore = require('connect-mongo')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/logindb', {useNewUrlParser: true})

server.set('view engine', 'ejs')

const loginSchema = new mongoose.Schema({
    user: {
        type: String
    },
    pass: {
        type: String
    }
}, {
    versionkey: false
})

const loginModel = mongoose.model('login', loginSchema)



server.get('/', function(req, resp){
    resp.render('./index')
})

server.post('/homepage', function(req, resp){
    const searchQuery = {
        user: req.body.user,
        pass: req.body.pass
    }
    loginModel.findOne(searchQuery, function(err, login) {
        if(err) return console.error(err)
        console.log(login)


        if (login != undefined && login._id != null) {
            var datares
            loginModel.find({}, function(err, res){
                datares = res
            })
            console.log(datares)
            resp.render('./homepage', {
                data: datares

            })
        }
        else {
            resp.redirect('/?login=failed')
        }


    })
})

const port = process.env.PORT | 9090
server.listen(port)
