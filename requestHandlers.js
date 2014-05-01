var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");




//this is sort of like a view file in django, or a controller in rails. 
//it defines the functions that requests are routed to to be processed. 

function start(response, request) {

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
    /* Possible error on Windows systems:
       tried to rename to an already existing file */
	fs.rename(files.upload.path, "/tmp/test.mov", function(err) { 
		if (err) {
        	fs.unlink("/tmp/test.mov");
        	fs.rename(files.upload.path, "/tmp/test.mov");
    	}
    });

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<style>#the_video{width:100%}</style><video id='the_video'  controls><source src='/show' type='video/mp4'><source src='movie.ogg' type='video/ogg'>Your browser does not support the video tag.</video>");
    response.end();
});

}



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


exports.start = start;
exports.upload = upload;
exports.show = show;

