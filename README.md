# ditto-logger
Simple middleware logger inspired by `rails` & `morgan`. Because rails log is simple yet quite informative and morgan can not shown url parameter.

# Usage
---
 ```js
 var logger = require('ditto-logger');
 ```

For now ditto-logger only accept stream options to define location to log(default is process.stdout)

```
logger({ stream: '../log/dev.log'});
```

# Examples
----
  ```js
  var express = require('express');
  var app = express();
  var logger = require('ditto-logger');

  app.use(logger);

  app.get('/', function(req, res){
    res.end('foo bar');
  });

  app.listen(4040, function(){
    console.log("Listening on 0.0.0.0:4040, CTRL+C to stop");
  });
  ```
