// server.js

// modules
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongojs         = require('mongojs');
var db              = mongojs('ratertainment', ['ratertainment']);


// config files
var database = require('./config/db');


// port
var port = process.env.PORT || 8080;


// get data from POST parameters
// parse application/json
app.use(bodyParser.json());


// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));


// static files location
app.use(express.static(__dirname + '/public'));


// routes
require('./app/routes')(app, db);


// start app
app.listen(port);


// print server status
console.log('Server running on port' + port);


// expose app
exports = module.exports = app;