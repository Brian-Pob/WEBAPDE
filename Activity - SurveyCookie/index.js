const express = require('express');
const server = express();

const cookieParser = require('cookie-parser');
server.use(cookieParser());

server.set('view engine', 'ejs');

server.use(express.static(__dirname + '/public'));

server.get('/', function(req, resp){
    resp.render('./index');
});

server.get('/answers', function(req, resp){
   if(req.query.last !== undefined &&
        req.query.first !== undefined &&
        req.query.id !== undefined){
       if(req.cookies.mydata === undefined)
            resp.cookie('mydata',req.query.last+
                 '-'+req.query.first+
                 '-'+req.query.id);
       else
           resp.cookie('mydata', req.cookies.mydata+
                 '$'+req.query.last+
                 '-'+req.query.first+
                 '-'+req.query.id);
   }
   console.log("Cookies :  ", req.cookies);
   resp.render('./answers');
});

const port = process.env.PORT | 9090;
server.listen(port);
