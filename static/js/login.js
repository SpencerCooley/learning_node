$('#login_button').click(function(){
        var oAuthUrl    =   'https://accounts.google.com/o/oauth2/auth?';
        var validUrl    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
        var scope       =   'https://www.googleapis.com/auth/drive';
        var clientId    =   '1055529155843.apps.googleusercontent.com';
        var redirect    =   'http://localhost:8888/dash'
        var type        =   'token';
        var theUrl        =   oAuthUrl + 'scope=' + scope + '&client_id=' + clientId + '&redirect_uri=' + redirect + '&response_type=' + type;
        
		var win = window.open(theUrl, "Spencer Cooley", "width=800,height=600");
        
        var pollTimer   =   window.setInterval(function() { 
            try {
                var theRedirectUrl = win.document.URL
                if (win.document.URL.indexOf(redirect) != -1) {
                    window.clearInterval(pollTimer);
                    win.close();
                    window.location = theRedirectUrl
                    	.replace('#', '?')
                    	.replace('dash', 'list')
                    	.replace('access_token', 'token');
                }
            } catch(e) {
      			
            }
        }, 100);

});


