var fs = require("fs");
var googleapis = require("googleapis");
var url = require('url');
var handlebars = require('handlebars');

//this is sort of like a view file in django, or a controller in rails. 
//it defines the functions that requests are routed to to be processed. 
function dash(response, request) {
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("just a placeholder for redirect");
    response.end();
}

function login(response, request) {
	console.log("Request handler 'show' was called."); 
	fs.readFile('./templates/login.html', function read(err, data){
		if (err){
			throw err
		}
		content = data
		response.writeHead(500, {"Content-Type": "text/html"});
		response.write(content);
		response.end();
	});
}

function list(response, request) {

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
	        	console.log(result.items)
	        	var videos = []
	        	var files = result.items;
				
				for (var i=0;i<files.length;i++)
				{
					if(files[i].mimeType == "video/mp4"){
						videos.push(files[i])
					}
				}
				
				fs.readFile('./templates/list.html','utf8', function read(err, data){
					if (err){
						throw err
					}
					console.log(videos)
					var content = data
					var theTemplate = handlebars.compile(content)
				
			        response.writeHead(200, {"Content-Type": "text/html"});
					response.write(theTemplate({'videos' : videos}));
					response.end()
				});	
	        }
	      });
	});
}

exports.dash = dash;
exports.list = list;
exports.login = login;

