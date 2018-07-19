//In order for Node.js to interact with the web as a server, it should
//use the http module.
const http = require('http');

//A port is where the system connects to the server. There are many
//different ports each reserved for use. In this case, if there are no given
//ports to the system, it will use port 9090.
const port =  process.env.PORT | 9090;

//For the server to start, a connection needs to be made at a certain port
//and must be listened to. This server creates a call-back function which
//has a request and response object.
//    request is the object that contains the information regarding the
//      request. This includes the parameters sent by a request.
//    response is the object that contains the functions for what the system
//      does so it can interact based off the request.
const server = http.createServer(function(req, resp){
  //function writes the head of the response object
  //param 1: http status. 200 means it loaded correctly
  //param 2: meta-data
  resp.writeHead(200, {"Content-Type": "text/html"});

  //The response data to be sent back
  resp.write("<html><body>hello <img src='http://assets.vg247.com/current//2015/05/the_witcher_3_wild_hunt_guide_walkthrough.jpg'> <br><form>Username<input type='text'></input>Password<input type='password'></input><input type='submit'></input></form></body></html>");

  //Trigger to send the data once things are complete
  resp.end();
});

//When this function is called, the system will look like it hung. This just means
//the system is running. Open a browser and go to "http://localhost:9090/"
server.listen(port);
