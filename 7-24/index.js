const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.set('view engine', 'ejs');

server.get('/', function(req, resp){
    resp.render('form.ejs');
});
server.post('/data', function(req, resp){
    var data = {lastname: req.body.lastname, firstname: req.body.firstname, idnum: req.body.idnum};
    resp.render('./data',{data: data});
});

const port = process.env.PORT | 9090;
server.listen(port);