const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

server.set('view engine', 'ejs');
server.use(express.static(__dirname + '/public'));

server.get('/', function (req, resp) {
  resp.render('./pages/index');
});

//Make-shift data to be used by the server
const inVal = ['cat', 'dog', 'bird', 'lion', 'fish'];
const outVal = ['meow', 'arf', 'chirp', 'rawr', 'blub'];

//post will process the request sent by the html page
server.post('/server_ajax', function (req, resp) {
  var i = 0,
    found = 0;
  while (found === 0 && i < inVal.length) {
    if (inVal[i] === req.body.input)
      found = 1;
    else
      i++;
  }
  //The system will not render a page but will instead send a JSon
  //array of information to be processed.
  if (found === 1)
    resp.send({
      sound: outVal[i]
    });
  else
    resp.send({
      sound: 'silence'
    });
});

const port = process.env.PORT | 9090;
server.listen(port);