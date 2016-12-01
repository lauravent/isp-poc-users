// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

/*##################### Security Management with Passport - START #####################*/
var passport = require('passport');
var session = require('express-session');
// Configure the Facebook strategy for use by Passport.
var FacebookStrategy = require('passport-facebook').Strategy;
var config = {
	// ########## Alessandro Guerrera Facebook Application
	/*'facebookAuth' : {
		'clientID' 		: '171283119932763', // your App ID
		'clientSecret' 	: '8ab9c542fdc44dfad735e075eaa99b8e', // your App Secret
		'callbackURL' 	: '/auth/facebook/callback',
		'port'			: 8082
	},*/
	// ========== Roberto Pozzi Facebook Application
	'facebookAuth' : {
		'clientID' 		: '1031295976946976', // your App ID
		'clientSecret' 	: '03b1711bdcc4b930e269a8b107bf26f8', // your App Secret
		'callbackURL' 	: '/auth/facebook/callback',
		'port'			: 8081
	},
};
passport.use(new FacebookStrategy({
	clientID : config.facebookAuth.clientID,
	clientSecret : config.facebookAuth.clientSecret,
	callbackURL : config.facebookAuth.callbackURL
}, function(accessToken, refreshToken, profile, cb) {
	console.log("[app] accessToken : " + accessToken);
	console.log("[app] profile : " + JSON.stringify(profile));
	return cb(null, profile);
}));
//Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
	cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./security')(app, passport);
/*##################### Security Management with Passport - END #####################*/

// routes
var routes = require("./routes");
app.use("/getUsers", routes);

var port = (process.env.VCAP_APP_PORT || config.facebookAuth.port);

app.listen(port);
console.log('[app] The magic happens on port ' + port);