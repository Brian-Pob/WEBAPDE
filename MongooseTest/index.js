const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/colordb')

const bodyParser = require('body-parser')
app.use(express.json())
app.use(express.urlencoded({
    extended: true
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

app.post('/index', function (req, resp) {
    const colorInstance = colorModel({
        backgroundcolor: req.body.backgroundcolor,
        fontcolor: req.body.fontcolor,
        postcolor: req.body.postcolor
    })

    colorInstance.save(function (err, data){
        if(err)
            console.error(err)
    })
    
})

app.get('/preferences', function (req, resp) {
    resp.render('./preferences')
})

const port = process.env.PORT | 9090
app.listen(port)