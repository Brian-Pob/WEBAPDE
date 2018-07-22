//Node.js is more like a language technology than it is a web framework. It is possible to
//use a framework to make the process much quicker. One such framework is Express.js
//It needs to be installed first from the package manager. Once done, just 'require' it.
const express = require('express');
const server = express(); // express removes the need for manually typing to create the http server

//The get function allows the server to process a get request and return the page that is
//requested. The function needs the path of the URL and a function that acts as the 
//response function when the URL is visited. In this case, it creates a page.
server.get('/', function(req, resp){
 var page = "<html> \
  <head> \
    <title>Form Page</title> \
  </head> \
  <body> \
    <form action='answer' method='get'> \
    <table> \
      <tr> \
        <td><label>Name</label></td> \
        <td><input type='text' name='name' /></td> \
      </tr> <tr> \
        <td><label>Password</label></td> \
        <td><input type='password' name='pass' /></td> \
      </tr> \
    </table> \
    <input type='submit' value='Submit' /> \
    </form> \
  </body> \
</html>";
    resp.send(page);
});

//The get function can also accomodate and respond to form requests by accessing
//the values of the parameters.
server.get('/answer/', function(req, resp){
var page = "<html> \
  <head> \
    <title>Data Page</title> \
  </head> \
  <body> \
    <table> \
      <tr> \
        <td><label>Name</label></td> \
        <td><label>"+req.query.name+"</label></td> \
      </tr> <tr> \
        <td><label>Password</label></td> \
        <td><label>"+req.query.pass+"</label></td> \
      </tr> \
    </table> \
  </body> \
</html>";
resp.send(page);
});

//just like the http library, the port should be listened to.
const port =  process.env.PORT | 9090;
server.listen(port);
