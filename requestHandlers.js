var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var googleapis = require("googleapis");
var url = require('url');


//this is sort of like a view file in django, or a controller in rails. 
//it defines the functions that requests are routed to to be processed. 

function dash(response, request) {

	console.log("Request handler 'start' was called.");
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" '+ 'content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" '+
	    'method="post">'+
	    '<input type="file" name="upload">'+
	    '<input type="submit" value="Upload file" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';


	response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}



function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm(); 
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    
	fs.rename(files.upload.path, "/tmp/test.mov", function(err) { 
		if (err) {
        	fs.unlink("/tmp/test.mov");
        	fs.rename(files.upload.path, "/tmp/test.mov");
    	}
    });

    response.writeHead(200, {"Content-Type": "text/html", "Accept-Ranges": "bytes"});
    response.write("<style>#the_video{width:1000px;}</style><video id='the_video'  controls='controls'><source src='/show' type='video/mp4'>Your browser does not support the video tag.</video>");
    response.end();
});

}


//you need to make this funciton serve a file from google drive instead of locally with fs
function show(response, request) {
	console.log("Request handler 'show' was called."); 
	fs.readFile("/tmp/test.mov", "binary", function(error, file) {

		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
		    response.write(err + "\n");
			response.end(); 
		} 
		else {
	      response.writeHead(200, {"Content-Type": "video/mp4"});
	      response.write(file, "binary");
	      response.end();
		} 
	});
	//closes fs.readFile function
}


function login(response, request) {
	console.log("Request handler 'show' was called."); 
	fs.readFile('./templates/external.html', function read(err, data){
		if (err){
			throw err
		}
		content = data
		response.writeHead(500, {"Content-Type": "text/html"});
		response.write(content);
		response.end();
	});
}






function test(response, request) {

	var queryData = url.parse(request.url, true).query;

	var auth = new googleapis.OAuth2Client();
	auth.setCredentials({
	  access_token: queryData.token
	});

	googleapis.discover('drive', 'v2').execute(function(err, client) {
  	  // insertion example
	  client
	      .drive.files.list()
	      .withAuthClient(auth)
	      .execute(function(err, result) {
	        if (err){
	        	response.writeHead(200, {"Content-Type": "application/json"});
				response.write(JSON.stringify(err));
				response.end()
	        }
	        else{
	        	console.log(result)
		        response.writeHead(200, {"Content-Type": "application/json"});
				response.write(JSON.stringify(result));
				response.end()
	        }
	      	
	      });

	});

}




exports.dash = dash;
exports.upload = upload;
exports.show = show;
exports.test = test;
exports.login = login;

