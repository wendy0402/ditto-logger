var strftime = require('strftime');
var onFinished = require('on-finished');
var url = require('url');
var httpStatus = require('http-status');

module.exports =  exports = function(req, res, next){
  process.stdout.write(createReqFormat(req));
  onFinished(res, function(err, res){
    if(err){
      process.stdout.write(err);
      return
    }
    process.stdout.write(createResFormat(res));
  });
  next();
};


function createReqFormat(req) {
  return compileRequest("\nStarted %pathName for %ipAddr at %time", req);
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