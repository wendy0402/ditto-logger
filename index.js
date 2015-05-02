var url = require('url');
var httpStatus = require('http-status');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs')

module.exports = exports = function(options){
  options = options || {}
  stream =  (options.stream !== undefined && fs.createWriteStream(options.stream, {flags: 'a'})) || process.stdout

  var logger = function(req, res, next){
    stream.write(createReqFormat(req));
    res.on('finish', function(){
      stream.write(createResFormat(res));
    });

    if(req.method !== 'GET') {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files){
        if(err) return next(err);
        stream.write('\n Parameters:' + util.inspect(fields));
        next();
      });
    } else {
      var urlParsed = url.parse(req.url, true)
      stream.write('\n Parameters:' + util.inspect(urlParsed.query));
      next();
    }
  };

  return logger;
}


function createReqFormat(req) {
  return compileRequest("\nStarted %method %pathName for %ipAddr at %time", req);
}

function createResFormat(res) {
  return compileResponse("\nCompleted %statusCode %statusMessage", res);
}

function compileRequest(format, req){
  return format.replace(/%\S+/g, function(str){
    str = str.replace('%', '');
    return exports.codeReqList[str](req);
  });
}

function compileResponse(format, res){
  return format.replace(/%\S+/g, function(str){
    str = str.replace('%', '');
    return exports.codeResList[str](res);
  });
}


exports.codeReqList = {}
exports.codeResList = {}


exports.codeReqList.method = function (req){
  return req.method;
}


exports.codeReqList.pathName = function (req){
  return url.parse(req.url).pathname;
}

exports.codeReqList.time = function (req){
  var date = new Date();
  return date.toString();
}


exports.codeReqList.ipAddr = function (req){
  return req.ip || req.connection.remoteAddress || req.socket.remoteAddress ||
  (req.connection.socket && req.connection.socket.remoteAddress) || undefined;
}

exports.codeResList.statusCode = function(res){
  return res.statusCode;
}

exports.codeResList.statusMessage = function(res){
  return httpStatus[res.statusCode];
}