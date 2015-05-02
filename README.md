# ditto-logger
Simple middleware logger inspired by `rails` & `morgan`. Because rails log is simple yet quite informative.

# API
---
 ```js
 var ditto = require('ditto-logger')
 ```

# Examples
----
  ```js
  var express = require('express');
  var app = express();
  var logger = require('../index.js');

  app.use(logger);

  app.get('/', function(req, res){
    res.end('foo bar');
  });

  app.listen(4040, function(){
    console.log("Listening on 0.0.0.0:4040, CTRL+C to stop");
  });
  ```
