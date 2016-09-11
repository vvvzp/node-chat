var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};

handle["/"] = requestHandlers.chat;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/getmsg"] = requestHandlers.getMsg;
handle["/savemsg"] = requestHandlers.saveMsg;

server.start(router.route, handle);
