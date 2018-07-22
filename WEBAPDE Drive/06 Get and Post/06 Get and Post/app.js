//There are different kinds of server requests that are accessible and each with their
//own purpose.
const express = require('express');
const server = express();

//This is a new library called Body Parser. This will be used later but should be installed
//in the NPM prior to running the application. This system will parse the data from its
//internal JSon system.
const bodyParser = require('body-parser')
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

server.get('/', function (req, resp) {
  var page = "<html> \
  <head> \
    <title>Form Page</title> \
  </head> \
  <body> \
    <form action='answer-get' method='get'> \
    <table> \
      <tr> \
        <td><label>GET Name</label></td> \
        <td><input type='text' name='name' /></td> \
      </tr> <tr> \
        <td><label>GET Password</label></td> \
        <td><input type='password' name='pass' /></td> \
      </tr> \
    </table> \
    <input type='submit' value='Submit' /> \
    </form> \
   <form action='answer-post' method='post'> \
    <table> \
      <tr> \
        <td><label>POST Name</label></td> \
        <td><input type='text' name='name' /></td> \
      </tr> <tr> \
        <td><label>POST Password</label></td> \
        <td><input type='password' name='pass' /></td> \
      </tr> \
    </table> \
    <input type='submit' value='Submit' /> \
    </form> \
  </body> \
</html>";
  resp.send(page);
});

//GET requests are requests where all the infromation is found in the URL and the
//parameters can be viewed plainly as part of then link.
server.get('/answer-get/', function (req, resp) {
  var page = "<html> \
  <head> \
    <title>Data Page</title> \
  </head> \
  <body> \
    <table> \
      <tr> \
        <td><label>Name</label></td> \
        <td><label>" + req.query.name + "</label></td> \
      </tr> <tr> \
        <td><label>Password</label></td> \
        <td><label>" + req.query.pass + "</label></td> \
      </tr> \
    </table> \
  </body> \
</html>";
  resp.send(page);
});

//POST is different from GET as its information is not present in the URL. POST has no 
//parameters in the URL. It is stored differently. To access the information, install the
//Body Parser library and use the req.body.<par>
server.post('/answer-post/', function (req, resp) {
  var page = "<html> \
  <head> \
    <title>Data Page</title> \
  </head> \
  <body> \
    <table> \
      <tr> \
        <td><label>Name</label></td> \
        <td><label>" + req.body.name + "</label></td> \
      </tr> <tr> \
        <td><label>Password</label></td> \
        <td><label>" + req.body.pass + "</label></td> \
      </tr> \
    </table> \
  </body> \
</html>";
  resp.send(page);
});

const port = process.env.PORT | 9090;
server.listen(port);