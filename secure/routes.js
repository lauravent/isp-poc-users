var express = require('express');
var router = express.Router();
var DBAccess = require('../services/dbAccess');
var dbAccess = new DBAccess();
var securityService = require('./securityService');

router.get('/:email', securityService.isAuthenticated, function(req, res) {
	var email = req.params.email;
	var data = "";
	data = dbAccess.getUser(email);
	console.log("[routes] Data sent to caller.");
	console.log(JSON.stringify(data,null,2));
	res.send(data);
});

module.exports = router;