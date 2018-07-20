const express = require('express');
const server = express();

//Require a MongoDB connection. This will create a client
//to connect to the specified mongoDB. The last part of the
//URL is the database it connects to.
const mongoClient = require('mongodb').MongoClient;
const databaseURL = "mongodb://localhost:27017/logindb";

const bodyParser = require('body-parser')
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

server.set('view engine', 'ejs');

//Only do database manipulation inside of the connection
//When a connection is made, it will try to make the database
//automatically. The collection(like a table) needs to be made.

mongoClient.connect(databaseURL, function (err, db) {
  if (err) throw err;
  const dbo = db.db("logindb");
  //Will create a collection if it has not yet been made
  dbo.createCollection("login", function (err, res) {
    if (err) throw err;
    console.log("Collection created!"); //create database
    db.close();
  });
});

server.get('/', function (req, resp) {
  resp.render('./pages/index');
});

server.post('/create-user', function (req, resp) {
  mongoClient.connect(databaseURL, function (err, db) {
    if (err) throw err;
    //The system will need a link to the database to be able to
    //communicate with it. Create this in the connection.
    const dbo = db.db("logindb"); //get database

    //Information can be inserted into the database. The format of the
    //data will look like a JSon array. Note: Primary keys "_id" will
    //be made automatically.
    const insertData = {
      user: req.body.user,
      pass: req.body.pass
    };

    dbo.collection("login").insertOne(insertData, function (err, res) { //insert data into database collection
      if (err) throw err;
      console.log("Insert Successful!");
      db.close(); //ln 38-58 is replaced by loginModel.save() in Mongoose
    });

  });
  const passData = {
    goodStatus: 1,
    msg: "User created successfully"
  };
  resp.render('./pages/result', {
    data: passData
  });
});

server.post('/read-user', function (req, resp) {
  mongoClient.connect(databaseURL, function (err, db) {
    if (err) throw err;
    const dbo = db.db("logindb");
    //A search query will come in the form of a JSon array as well. Make
    //sure that it follows the correct syntax.
    const searchQuery = {
      user: req.body.user,
      pass: req.body.pass //searchQuery data takes the data of the attributes
    };
    var queryResult = 0;

    dbo.collection("login").find(searchQuery).toArray(function (err, result) {
      if (err) throw err;

      //The result, in this case, is a JSon array. This one will need to
      //go though the elements in order to find the right one. In a simple
      //login, there should be only 1 element.
      console.log(result);

      if (result.length > 0 && result[0]._id != null) //make sure the result isn't empty
        queryResult = 1;
      db.close();
      console.log("Read Successful!");

      //Put the change of interface in here as the system does not load
      //things synchronously rather asynchronously. In this case, what is
      //displayed will depend on the information found and so the system
      //must wait for the results first.
      var strMsg;
      if (queryResult === 1) 
        strMsg = "User-name and password match!";
      else 
        strMsg = "User-name and password do not match!";
      const passData = {
        goodStatus: queryResult,
        msg: strMsg
      };
      resp.render('./pages/result', {
        data: passData
      });
    });
  });
});

server.post('/update-user', function (req, resp) {
  mongoClient.connect(databaseURL, function (err, db) {
    if (err) throw err;
    const dbo = db.db("logindb");

    //To update a query, it will need to have a search parameter and a
    //change of values.
    const updateQuery = {
      user: req.body.user   //parameter
    };
    const updateValues = {
      $set: {
        pass: req.body.pass   //value to be changed
      }
    };

    //This function will only update a single entry.
    dbo.collection("login").updateOne(updateQuery, updateValues, function (err, res) {
      if (err) throw err;
      console.log("Update Successful!");
      db.close();
    });
  });
  const passData = {
    goodStatus: 1,
    msg: "User updated successfully if exists!"
  };
  resp.render('./pages/result', {
    data: passData
  });
});

const port = process.env.PORT | 9090;
server.listen(port);