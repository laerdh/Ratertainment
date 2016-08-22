// server.js

// modules
var express         = require('express');
var app             = express();
var http            = require('http').Server(app);
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongojs         = require('mongojs');
var db              = mongojs('ratertainment', ['ratertainment']);
var io              = require('socket.io')(http);


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
require('./app/routes')(app, db, mongojs);


// start app
http.listen(8080, function() {
    console.log("Listening on port: " + port);
});


// socket.io server
io.on('connection', function(socket) {
    console.log('WS: A user connected');
    socket.on('disconnect', function() {
        console.log('WS: A user disconnected');
    });
    
    socket.on('like', function() {
        console.log("Like event");
        io.emit('updateLikes');
    });
    
    socket.on('dislike', function() {
        console.log("Dislike event");
        io.emit('updateDislikes');
    });
});


// expose app
exports = module.exports = app;