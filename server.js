//the server file that defines how the server works
var http = require('http');
var url = require('url');
var static = require('node-static');

function start(route, handle) {
  
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
	route(handle, pathname, response, request);

  }

  //this is the application server
  http.createServer(onRequest).listen(8888);
  console.log("Server has started."); 


  //this is just a static server use to serve client side js, css, stuff like that. 
  var fileServer = new static.Server('./static');
  require('http').createServer(function (request, response) {
	request.addListener('end', function () {
		fileServer.serve(request, response);
	}).resume();
  }).listen(8080);

}

exports.start = start;
