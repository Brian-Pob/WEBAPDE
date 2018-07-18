const express = require('express');
const server = express();

server.use(express.static(__dirname + '/public'));
server.set('view engine', 'ejs');

server.get('/', function(req, resp){
   resp.render('index.ejs');
});

server.get('/animal', function(req, resp){
     var data = {name: 'default'};
    
    if(req.query.index === "1"){
       data = {name: 'cat'};
       
    }
    else if(req.query.index === "2"){
        data = {name: 'dog'};
        
    }
    else if(req.query.index === "3"){
        data = {name: 'ham'};
        
    }
    
   
    resp.render('animals.ejs', {data: data});
});

const port = process.env.PORT | 9090;
server.listen(port);