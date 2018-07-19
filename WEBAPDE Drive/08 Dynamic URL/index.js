const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

server.set('view engine', 'ejs');

//As shows in a previous code sample, it is possible to create custom modules. In this case
//this is a dummy database module.
const database = require('./model/database');

server.get('/', function(req, resp){
   resp.render('./pages/index');
});

server.post('/answer/', function(req, resp){
    var data = {id: req.body.id ,food: database.databaseQuery(Number(req.body.id)) };
    resp.render('./pages/answer',{ data: data });
});

//It is also possible to access the URL as a parameter and get its parameter for dynamic
//page generation specially if the content is in the database.
server.get('/:id/', function(req, resp){
    var number = Number(req.params.id);
    var data = {
        id: number ,
        food: database.foodQuery(Number(number)) ,
        animal: database.animQuery(Number(number)) 
    };
    resp.render('./pages/check',{ data: data });
});

const port = process.env.PORT | 9090;
server.listen(port);