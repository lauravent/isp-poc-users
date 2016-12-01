// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
	if (!req.isAuthenticated()) {
		req.session.originalUrl = req.originalUrl;
		res.redirect('/login/facebook');
	} else {
		return next();
	}
}

exports.isAuthenticated = isAuthenticated;