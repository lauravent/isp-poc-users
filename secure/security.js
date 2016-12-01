module.exports = function(app, passport) {
	app.get('/login/facebook', passport.authenticate('facebook'));
	
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', { failureRedirect: '/' }),
		function(req, res) {
			var redirect_url = req.session.originalUrl;
			res.redirect(redirect_url);
		});
};