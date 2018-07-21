const http = require('http')
const fs = require('fs') //require file reading
const port = process.env.PORT | 8080

const server = http.createServer(function(req, res){
    fs.readFile('demofile1.html', function(err, data){ //read specified file, data is the content
        res.writeHead(200, {'Content-Type':'text/html'})
        res.write(data)
        res.end()
    })
    //fs.appendFile appends or writes if file dne
    //fs.writeFile writes if file dne or overwrites
    //fs.openFile opens or creates empty file if file dne
    //fs.unlink deletes
    //fs.rename renames
})

server.listen(port)