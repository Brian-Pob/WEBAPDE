const http = require('http')
const url = require('url')
const fs = require('fs')
const portnum = process.env.PORT | 8080
// var ex = require('express')
// var newserver = express()
const server = http.createServer(function(req, res){ //in using node, you do something for each module and what it does
                                                     //is written in the function
    // res.writeHead(200, {'Content-Type':'text/html'})
    var q = url.parse(req.url, true)
    var filename = "." + q.pathname
    console.log(q.pathname)
    // filename == ./ (becomes ./filename.html)
    fs.readFile(filename, function(err, data){ //accessing fs.readFile 
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end('404 Not Found')
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        return res.end()
    })
})

server.listen(portnum)
