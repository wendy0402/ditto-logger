var express = require('express');
var app = express();
var logger = require('../index.js');

app.use(logger);

app.get('/', function(req, res){
  res.end('foo bar');
});

app.post('/post', function(req, res){
  res.end('foo post');
});

app.listen(4040, function(){
  console.log("Listening on 0.0.0.0:4040, CTRL+C to stop");
});