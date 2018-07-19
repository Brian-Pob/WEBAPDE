//EJS is an embeded technology that can be used to include one
//page into another. This is similar to how to how PhP and Servlets
//organize their views.
//    https://www.npmjs.com/package/ejs
const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

//The system must use the ejs view engine. When this is used,
//it will require a folder called "views" where all the embeded
//javascript files will be used. Sub-foldering may also be used.
server.set('view engine', 'ejs');

//To use the EJS functionality, use the function called render
//and render the EJS file from the view folder. The path will
//assume that it is already in the view folder but can go lower
//into other directories.
server.get('/', function(req, resp){
   resp.render('./pages/index');
});

//additionally, it is possible to pass information into the view
//by passing a javascript object.
server.post('/answer', function(req, resp){
    if(req.body.name == "user" && req.body.pass == "pass"){
        var data = {name: req.body.name ,pass: req.body.pass};
        resp.render('./pages/answer',{ data: data });
    }
    else{
        
        resp.render('./pages/wrong',{data: data});
    }
        
});

const port = process.env.PORT | 9090;
server.listen(port);