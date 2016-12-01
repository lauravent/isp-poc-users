// ********** Cloudant init - START
var db = {};
var dbCredentials = {};
var dbname = "user_preferences";
try {
	console.log("[dbAccess] process.env.VCAP_SERVICES = " + process.env.VCAP_SERVICES);
	var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
	var cloudantService = services.cloudantNoSQLDB[0]; 
	dbCredentials.user = cloudantService.credentials.username;
	dbCredentials.password = cloudantService.credentials.password;
	dbCredentials.host = cloudantService.credentials.host;
	dbCredentials.port = cloudantService.credentials.port;
	dbCredentials.url = cloudantService.credentials.url;
} catch (e) {
	console.log("[dbAccess] VCAP_SERVICES not found, falling back to defaults ...");
	dbCredentials.user = "30ba0ea4-b72d-40b4-b957-7b554f55d385-bluemix";
	dbCredentials.password = "61f1f90fd34dc72b0b2f307faca0b7ef75fb04023cec42028d269843eedfda14";
	dbCredentials.host = "30ba0ea4-b72d-40b4-b957-7b554f55d385-bluemix.cloudant.com";
	dbCredentials.port = 443;
	dbCredentials.url = "https://30ba0ea4-b72d-40b4-b957-7b554f55d385-bluemix:61f1f90fd34dc72b0b2f307faca0b7ef75fb04023cec42028d269843eedfda14@30ba0ea4-b72d-40b4-b957-7b554f55d385-bluemix.cloudant.com";
}
var cloudant = require('cloudant')(dbCredentials.url);
//********** Cloudant init - END
var CloudantAccess = function(){
	console.log('[dbAccess] Init Cloudant!');
};

// Cloudant CRUD functions
CloudantAccess.prototype.getUser = function(username) {
    var db = cloudant.use(dbname);
    console.log("[dbAccess] I went and called cloudant");
    var user;
    // Use Cloudant query to find the user just based on username
    console.log("[dbAccess] about to call for cloudant with email = " + username);
    db.find({selector:{email:username}}, function(err, result) {
        if (err){
            console.log("[dbAccess] There was an error finding the user: " + err);
            return err;
        } 
        if (result.docs.length == 0){
        	console.log("[dbAccess] User not found");
        	user = " ";
        }
        else
        	user = result.docs[0];
    });
    while(!user) {
  	    require('deasync').runLoopOnce();
  	  }
    return user;
}

/* To develop - Write to DB
CloudantAccess.prototype.setUser = function(user) {
    // Use Cloudant query to write user info
    console.log("about to call for cloudant");
    var db = cloudant.use(dbname);
    console.log("I went and called cloudant");
    
    var email = user.email;
	var emailVerify = user.emailVerify;
	var passwordIn = user.password;
	var passwordVerify = user.passwordVerify;

    
   // find a user whose email is the same as the forms email
	console.log("email " + email);
	var newUser = req.body;
	
	if(!email || email == "")
	{
		return done(null, false, req.flash('signupMessage',
					'Email is empty.'));
	}
	
	if(email != emailVerify)
	{	
		return done(null, false, req.flash('signupMessage',
					'Email and Email Cofirmation are different.'));
	}
	
	if(!passwordIn || passwordIn == "")
	{
		return done(null, false, req.flash('signupMessage',
					'Password is empty.'));
	}
	
	if(passwordIn != passwordVerify)
	{	return done(null, false, req.flash('signupMessage',
					'Password and Password Confirmation are different.'));
	}
	
	delete newUser.emailVerify;
	delete newUser.passwordVerify;
	newUser._id = email;
			
	newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	
    console.log("about to call for cloudant");
    db = cloudant.use(dbname);
    console.log("I went and called cloudant");
    
    db.find({selector:{_id:email}}, function(err, user) {
		// if there are any errors, return the error
		if (err) {
			return done(err);
		}

		// check to see if there already is a user with that email
		if (user.docs.length>0) {
			console.log("Found other users with same id");
			return done(null, false, req.flash('signupMessage','That email is already taken.'));
		} else {

			// save the user
			db = cloudant.use(dbname);
			db.insert(
				newUser,
				function(err, doc) {
				if(err) {
					console.log(err);
					// response.sendStatus(500);
				} else {
					console.log("created!");
					return done(null, newUser);
					// var resp = {"created":true};
					// response.write(JSON.stringify(resp));
					// response.end();
				}
			});
		}

	});
}
*/
module.exports = CloudantAccess;