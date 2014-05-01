//the bootstrap file that starts up the server

//require seems like the same thing as importing modules in django.
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//this is just like urls.py in django. 
//maps url to controller function. 
var handle = {}
handle["/"] = requestHandlers.start; 
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
