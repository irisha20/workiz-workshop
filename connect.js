//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
var mysql = require('mysql')
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kirochka1980',
    database: 'workizdb'
  })

  connection.connect(function(err){
      if(err)throw err;
      console.log("Connected..");
  })
  
//for redirect to thank you page after submit
  app.get('/thanks', function(req, res) {
    res.sendFile(__dirname + "/public/thank-you-page.html");
  });

  //for redirect to error page after submit
  app.get('/error', function(req, res) {
    res.sendFile(__dirname + "/public/error-submitting.html");
  });

  //submits data to database
  app.post("/submit", function(req, res) {
  // console.log(req.body);
   
var sql = "insert into subscribers values('"+req.body.fullName +"','"+req.body.email +"','"+req.body.phone +"','"+req.body.comments +"','"+req.body.workshop+"')";

    connection.query(sql, function (err) {
        if (err) {
            console.log (err);
            
            res.redirect('/error'); } 
        
           
      res.redirect('/thanks');
        
      })
      //uncomment line below if you want to close connection after each user submit
      // connection.end();
  
  });

  





  //database connect 
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}





app.listen(port, function() {
  console.log("Server has started successfully");
});
