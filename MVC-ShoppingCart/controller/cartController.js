const cartModel = require('../model/cartModel');
const formidable = require('formidable'); 
const fs = require('fs');

function CartModule(server){
  server.get('/home', function(req, resp){
    cartModel.viewInvetory(function(list){
      const data = { list:list };
      resp.render('./pages/home',{ data:data });
    });
  });

  server.get('/addInvetory', function(req, resp){
    resp.render('./pages/addInventory');
  });

  server.post('/system-processing/addinvetory-result', function(req, resp){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.image.path;
      var newpath = __dirname + '/../public/upload/' + files.image.name;
      fs.rename(oldpath, newpath, function (err) {
        console.log('file transfer started');
        if (err) throw err;
        console.log('NUMBER: '+fields.price);
        var num = Number(fields.price);
        if(isNaN(num))
          num = 500;
        cartModel.addInvetory(fields.item, files.image.name, num ,function(){
          resp.redirect('/home');
        });//addInv
      });//rename
    });//parse
  });//post
}

module.exports.Activate = CartModule;
