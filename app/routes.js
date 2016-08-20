// app/routes.js

module.exports = function (app, db, mongojs) {
    
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
    
    
    app.post('/movies', function(req, res) {
        console.log("Recieved a POST request: " + req.body);    
        
        db.ratertainment.insert(req.body, function(err, result) {
            if (err)
                throw err;
            console.log("Inserted element(s)");
        });
    });
    
    
    app.delete('/movies/:id', function(req, res) {
        var id = req.params.id;
        console.log("Recieved a DELETE request with id: " + id);
        
        db.ratertainment.remove({_id: mongojs.ObjectId(id)}, function(err, result) {
            if (err)
                throw err;
            res.json(result);
            console.log("Removed element");
        });
    })
}