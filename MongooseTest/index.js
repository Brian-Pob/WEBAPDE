const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/colordb')

const bodyParser = require('body-parser')
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const session = require('express-session')
app.use(session({
    secret: 'blamp',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 2 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}))

app.set('view engine', 'ejs')

const colorSchema = new mongoose.Schema({
    backgroundcolor: {
        type: String
    },
    fontcolor: {
        type: String
    },
    postcolor: {
        type: String
    }
}, {
    versionKey: false
})

const colorModel = mongoose.model('color', colorSchema)

app.get('/', function (req, resp) {
    resp.render('./index.ejs')
})

app.get('/index', function(req, resp) {
    if(!isUndefined(req.session.backgroundcolor) && !isUndefined(req.session.postcolor) && !isUndefined(req.session.fontcolor)){
        
    }
    resp.render('./index.ejs')
})

app.post('/submitcolor', function (req, resp) {
    const colorInstance = colorModel({
        backgroundcolor: req.body.backgroundcolor,
        fontcolor: req.body.fontcolor,
        postcolor: req.body.postcolor
    })

    colorInstance.save(function (err, data){
        var data
        if(err){
            console.error(err)
            data = {message: 'Did not save successfully'}
        }else{
            data = {message: 'Saved Successfully'}
        }
        resp.render('./saved')
            
    })
    
})

app.get('/preferences', function (req, resp) {
    resp.render('./preferences')
})

const port = process.env.PORT | 9090
app.listen(port)