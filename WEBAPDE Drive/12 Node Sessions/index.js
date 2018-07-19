const express = require('express');
const server = express();

//load the needed libraries to connect to sessions
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

//The mongoose connection will be used
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/logindb');

//connect the sessions with the mongoose connection. This will save the
//content on the server on its own schema.
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 * 24 * 60 * 60,
      autoRemove: 'native'
    })
}));

server.set('view engine', 'ejs');

const loginSchema = new mongoose.Schema(
  { user: { type: String }, pass: { type: String } },
  { versionKey: false });
const loginModel = mongoose.model('login', loginSchema);

server.get('/', function(req, resp){
   resp.render('./pages/index');
});

//One can save information as a new entry in the sessions array. This will
//save to the database after the page is loaded.
server.get('/homepage', function(req, resp){
  if(req.session.user !== undefined){
    resp.render('./pages/homepage');
  }else{
    const searchQuery = { user: req.query.user, pass: req.query.pass };
    loginModel.findOne(searchQuery, function (err, login) {
      if(err) return console.error(err);
      if(login != undefined && login._id != null){
        req.session.user = login._id;
        resp.render('./pages/homepage');
      }else
        resp.redirect('/?login=failed');
    });
  }
});

//The user will logout. The system will not allow one to visit the logout
//page unless the user is logged in. Otherwise, it will redirect to the
//login page.
server.get('/logout', function(req, resp){
  if(req.session.user === undefined){
    resp.redirect('/?login=unlogged');
  }else{
    //destroying a session will remove the entry from the database
    //as well. This will essentially log-out the user.
    req.session.destroy(function(err) {
      resp.render('./pages/logout');
    });
  }
});

const port = process.env.PORT | 9090;
server.listen(port);
