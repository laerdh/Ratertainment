// app/routes.js

module.exports = function (app, db) {
    
    // define routes
    app.get('/movies', function(req, res) {
        
        console.log("Recieved a GET request");
        
        db.ratertainment.find(function (err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                res.send(500);
            }
        });
    });
    
    
    app.get('/', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}