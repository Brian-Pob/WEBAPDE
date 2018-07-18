const express = require('express');
const server = express();

server.set('view engine', 'ejs');

server.use(express.static(__dirname + '/public'));

server.get('/', function(req, resp){
   resp.render('./pages/index');
});

server.get('/animal', function(req, resp){
    var data = { index:Number(req.query.index) }
   resp.render('./pages/animal',{data:data});
});

const port = process.env.PORT | 9090;
server.listen(port);
