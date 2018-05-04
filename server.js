// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var cors = require('cors');
// configuration ===========================================
	
// config files
var settings = require('./config/settings');

// var port = process.env.PORT || 8080; // set our port
var port = settings.port; // set our port
// allow cross origin
app.use(cors());

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

require('./routes/getSalarySlip').mount(app); // pass our application into our route


// handle errors
app.use(require('./lib/errorHandler'));

// start app ===============================================
app.listen(port);	
console.log('Server running on port ' + port); 			
exports = module.exports = app; 						