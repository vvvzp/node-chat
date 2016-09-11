var exec = require("child_process").exec;
var fs = require("fs");

var file = "index.html"
var counter = 0;
var msg = [];
msg.push({id:1,creatorName:'Vx',content:'this is test message'});
msg.push({id:2,creatorName:'Zuko',content:'oop2'});
msg.push({id:3,creatorName:'I\'m',content:'oops 3'});
msg.push({id:4,creatorName:'Mx',content:'Four 4'});
console.log(msg);

function saveMsg(response,request){
  console.log(request.url);
  var data = '';
  request.on('data', function(chunk) {
      data += chunk.toString();
  });
  request.on('end', function() {
      data = JSON.parse(data);
      data.id = getNewId()
      console.log(data);
      msg.push(data);
      response.write(JSON.stringify(data));
      response.end();
  });
}
function getMsg(response,request){
  response.writeHead(200, {"Content-Type": "text/html"});
  var id = getParam(request.url,'id');
  var res = getMsgFromDB(id);
  response.write(JSON.stringify(res));
  response.end();
}
function getNewId(){
  return msg[msg.length-1].id+1;
}
function getMsgFromDB(startId){
  console.log(startId)
  startId = startId || 0;
  var res = [];
  if (startId==0 || startId>msg.length){
    var limit = 3;
    for(i=msg.length-limit;i< msg.length && limit>0;i++){
      res.push( msg[i] );  
      limit--;
    }
  } else{
    for (var i=startId;i<msg.length;i++){
      res.push(msg[i]);
    }
  }
  console.log(res)
  return res
}
function getParam(url,param){
  var _arr = url.split(param+'=');
  console.log(url)
  console.log(JSON.stringify(_arr));
  if (_arr.length>1){
    return _arr[1]
  } else {
    return 0
  }
}
function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}
function chat(response){
  //response.write("<button>click me</button> Chat 2");
  fs.readFile(file, function(err, contents) {
      if(!err){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(contents);
        counter++;
        response.write('count: '+counter);
        console.log(counter)
        response.end();
      }
  });
  
}

exports.saveMsg = saveMsg;
exports.getMsg = getMsg;
exports.start = start;
exports.upload = upload;
exports.chat = chat;