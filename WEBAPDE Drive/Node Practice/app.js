//start with requiring http
const http = require('http'); //require() makes your application access the specified node module
const mod = require('./mymodule');
const url = require('url')
//const server port = process.env.PORT | 8080
//const server = http.createServer(function(req, res){
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/plain'});
    // res.write('Hello World \n');
    // res.write('The current date and time is '+ mod.myDateandTime() + '\n');
    // res.write(req.url);
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt);
}).listen(8080);
//
// set the port number
// server.listen(port);

