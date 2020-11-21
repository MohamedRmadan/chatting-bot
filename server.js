/*const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//app configuration 
app.set('port', (process.env.PORT || 5000));

//setup our express app
app.use(morgan('dev')); //log every request to console
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


//app routes
require('./routes/webhook_verify')(app);

//server start
app.listen(app.get('port'), function() {
    const url = 'http://localhost:' + app.set('port');
    console.log('app running on port: ' + app.get('port'));
})
*/

var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === "this_is_my_token") {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});