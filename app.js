// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// routes
var routes = require("./routes");
app.use("/getUsers", routes);

var port = (process.env.VCAP_APP_PORT || 8081);

app.listen(port);
console.log('[app] The magic happens on port ' + port);