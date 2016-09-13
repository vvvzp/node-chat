var express = require('express');
var router = express.Router();

var file = "index.html"
var counter = 0;
var msg = [];
msg.push({id:1,creatorName:'#user',content:'this is test message'});
console.log(msg)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat');
});

router.get('/getmsg', function(req, res, next) {
	var id = getParam(req.url,'id');
  	var r = getMessages(id);
  	res.send(JSON.stringify(r));
});

router.post('/savemsg', function(req, res, next) {
	var data = JSON.parse(req.body.msg);
	data.id = getNewId();
	msg.push(data);
  	res.send(JSON.stringify(data));
});

module.exports = router;

function getMessages(startId){
  startId = startId || 0;
  var res = [];
  if (startId==0 || startId>msg.length){
    var limit = 10;
    if(limit > msg.length){
      limit = msg.length
    }
    for(i=msg.length-limit; limit>0;i++){
      res.push( msg[i] );  
      limit--;
    }
  } else{
    for (var i=startId;i<msg.length;i++){
      res.push(msg[i]);
    }
  }
  return res
}
function getParam(url,param){
  var _arr = url.split(param+'=');
  if (_arr.length>1){
    return _arr[1]
  } else {
    return 0
  }
}
function getNewId(){
  if(msg && msg.length){
    return msg[msg.length-1].id+1;
  } else {
    return 1
  }
}