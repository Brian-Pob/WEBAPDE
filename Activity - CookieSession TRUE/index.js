//Project: Use sessions to display Prefernces

//use-case
//1. View pages
//   A. login/index
//   B. preferences
//   C. text/homepage
//   D. logout
//   E. saved
//2. login
//   A. Send username & password
//   B. check if user/pass in database
//   C. Create session
//   D. Load next page
//3. Change the BG, font, post
//   A. Load current preferences
//   B. Display preferences
//   C. Select peference changes
//   D. Submit said form
//   E. Save to the database
//      a. get data from page
//      b. prepare query
//      c. save query
const express = require('express');
const server = express();


const session = require('express-session');
const mongoStore = require('connect-mongo')(session);


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/logindb');


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

const loginSchema = new mongoose.Schema({
  user: {
    type: String
  },
  pass: {
    type: String
  },
  post: {
    type: String
  },
  bg: {
    type: String
  },
  font: {
    type: String
  }
}, {
  versionKey: false
});
const loginModel = mongoose.model('login', loginSchema);

//1. view pages
//1.A: Login
server.get('/', function (req, resp) {
  resp.render('./pages/index');
  //2.A. Send username & password
});

//1.B: preference
server.get('/preference', function (req, resp) {
  if (req.session.user === undefined) {
    resp.redirect('/?login=unlogged');
  } else {
    //3.1. Load current preferences
    const searchQuery = {
      _id: req.session.user
    };
    loginModel.findOne(searchQuery, function (err, login) {
      if (err) return console.error(err);
      var post = 'blue';
      if (login.post !== undefined)
        post = login.post;
      var bg = 'green';
      if (login.bg !== undefined)
        bg = login.bg;
      var font = 'white';
      if (login.font !== undefined)
        font = login.font;
      var data = {
        post: post,
        bg: bg,
        font: font
      };
      resp.render('./pages/preference', {
        data: data
      });
    });
  }
});

//1.C: text/homepage
server.get('/homepage', function (req, resp) {
  if (req.session.user !== undefined) {
    //3.1. Load current preferences
    const searchQuery = {
      _id: req.session.user
    };
    loginModel.findOne(searchQuery, function (err, login) {
      if (err) return console.error(err);
      var post = 'blue';
      if (login.post !== undefined)
        post = login.post;
      var bg = 'green';
      if (login.bg !== undefined)
        bg = login.bg;
      var font = 'white';
      if (login.font !== undefined)
        font = login.font;
      var data = {
        post: post,
        bg: bg,
        font: font
      };
      resp.render('./pages/homepage', {
        data: data
      });
    });
  } else {
    //2.B. check if user/pass in database
    const searchQuery = {
      user: req.query.user,
      pass: req.query.pass
    };
    loginModel.findOne(searchQuery, function (err, login) {
      if (err) return console.error(err);
      if (login != undefined && login._id != null) {
        //2.C. Create session
        req.session.user = login._id;
        //2.D. Load next page

        //3.1. Load current preferences
        resp.render('./pages/homepage');
      } else
        resp.redirect('/?login=failed');
    });
  }
});

//1.D: logout
server.get('/logout', function (req, resp) {
  if (req.session.user === undefined) {
    resp.redirect('/?login=unlogged');
  } else {
    req.session.destroy(function (err) {
      resp.render('./pages/logout');
    });
  }
});

//1.E: saved
server.get('/saved', function (req, resp) {
  if (req.session.user === undefined) {
    resp.redirect('/?login=unlogged');
  } else {
    //3.E. Save to the database
    //a. get data from page
    //   - use req.query
    //b. prepare query
    console.log('Save process start!');
    const updateQuery = {
      _id: req.session.user
    };

    loginModel.findOne(updateQuery, function (err, login) {
      login.post = req.query.post;
      login.bg = req.query.page;
      login.font = req.query.font;

      login.save(function (err, result) {
        if (err) return console.error(err);
        //c. save query
        console.log('Save process ended!');
        resp.render('./pages/saved');
      });
    });

  }
});

const port = process.env.PORT | 9090;
server.listen(port);