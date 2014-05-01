$('#login_button').click(function(){
        var oAuthUrl    =   'https://accounts.google.com/o/oauth2/auth?';
        var validUrl    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
        var scope       =   'https://www.googleapis.com/auth/userinfo.profile';
        var clientId    =   '1055529155843.apps.googleusercontent.com';
        var redirect    =   'http://localhost:8888/start'
        var type        =   'token';
        var theUrl        =   oAuthUrl + 'scope=' + scope + '&client_id=' + clientId + '&redirect_uri=' + redirect + '&response_type=' + type;
		window.open(theUrl, "Spencer Cooley", "width=500,height=500");
});