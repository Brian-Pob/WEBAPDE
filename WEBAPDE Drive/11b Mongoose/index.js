const express = require('express');
const server = express();

//Require a MongoDB connection using mongoose. Include the mongoose library
//and feed it the correct url to run MongoDB.
//URL is the database it connects to.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/logindb');

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

server.set('view engine', 'ejs');

//Mongoose will need to define a schema that is used as a template.
//This will contain the model details that is used by the schema.
//the second array is for options. By default, Mongoose adds an extra
//field for versioning. This will be removed.
const loginSchema = new mongoose.Schema({
  user: { type: String },
  pass: { type: String }
},{ versionKey: false });

//Note: mongoose will add an extra 's' at the end of the schema. So even if
//it is accessed normally, it will just include the 's' when it is seen in
//the live database.

//Then the model has to be actualized. This is what the system will interact
//with while the program is running.
const loginModel = mongoose.model('login', loginSchema);

server.get('/', function(req, resp){
   resp.render('./pages/index');
});

server.post('/create-user', function(req, resp){
  //Creating a new instance can be made this way.
  const loginInstance = loginModel({
    user: req.body.user,
    pass: req.body.pass
  });
  
  //to save this into the database, call the instance's save function.
  //it will have a call-back to check if it worked.
  loginInstance.save(function (err, fluffy) {
    if(err) return console.error(err);
    const passData = { goodStatus: 1, msg:"User created successfully" };
    resp.render('./pages/result',{ data:passData });
  });
});

server.post('/read-user', function(req, resp){
  const searchQuery = { user: req.body.user, pass: req.body.pass };
  var queryResult = 0;

  //The model can be found via a search query and the information is found
  //in the login function. Access the information like a JSon array.
  loginModel.findOne(searchQuery, function (err, login) {
    if(err) return console.error(err);
    if(login != undefined && login._id != null)
      queryResult = 1;

      //Put the change of interface in here as the system does not load
      //things synchronously rather asynchronously. In this case, what is
      //displayed will depend on the information found and so the system
      //must wait for the results first.
      var strMsg;
      if(queryResult === 1)strMsg = "User-name and password match!";
      else strMsg = "User-name and password do not match!";
      const passData = { goodStatus: queryResult, msg:strMsg };
      resp.render('./pages/result',{ data:passData });
  });
});

server.post('/update-user', function(req, resp){
  const updateQuery = { user: req.body.user };

  //To update a query, first it must found. Then afterwards, its information
  //can be edited. Call the save function to update the changes.
  loginModel.findOne(updateQuery, function (err, login) {
    login.pass = req.body.pass;
    login.save(function (err, result) {
      if (err) return console.error(err);
      const passData = { goodStatus: 1, msg:"User updated successfully if exists!" };
      resp.render('./pages/result',{ data:passData });
    });
  });
});

const port = process.env.PORT | 9090;
server.listen(port);
