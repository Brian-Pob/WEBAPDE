const express = require('express');
const server = express();

server.set('view engine', 'ejs');

//Express also has features that allow static assets to be public
//and can be accessible to the page. This allows css and js files as
//well as images to be exposed.
server.use(express.static(__dirname + '/public'));

server.get('/', function(req, resp){
   resp.render('./pages/index');
});

const port = process.env.PORT | 9090;
server.listen(port);
