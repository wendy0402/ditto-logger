var express = require('express');
var app = express();
var logger = require('../index.js');
var url = require('url');
var bodyParser = require('body-parser');


app.use(logger);

app.get('/', function(req, res){
  setTimeout(function(){
    res.end('foo bar');
  }, 3000);
  
});

app.post('/post', function(req, res){
  res.end('foo post');
});

app.listen(4040, function(){
  console.log("Listening on 0.0.0.0:4040, CTRL+C to stop");
});