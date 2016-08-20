// app/routes.js

module.exports = function (app, db, mongojs) {
    
    // define routes
    app.get('/movies', function(req, res) {
        
        console.log("Recieved a GET request");
        
        db.ratertainment.find(function (err, doc) {
            if (!err) {
                res.json(doc);
            } else {
                res.send(500);
            }
        });
    });
    
    
    app.get('/', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
    
    
    app.post('/movies', function(req, res) {
        console.log("Recieved a POST request");
        
        // initialize likes to zero
        var data = req.body;
        data.likes = 0;
        
        db.ratertainment.insert(data, function(err, doc) {
            if (err)
                throw err;
            console.log("Inserted element(s)");
        });
    });
    
    
    app.delete('/movies/:id', function(req, res) {
        var id = req.params.id;
        console.log("Recieved a DELETE request with id: " + id);
        
        db.ratertainment.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
            if (err)
                throw err;
            res.json(doc);
            console.log("Removed element");
        });
    });
    
    
    app.get('/movies/:id', function(req, res) {
        var id = req.params.id;
        console.log("Recieved a GET request with id: " + id);
        
        db.ratertainment.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
            res.json(doc);
            console.log("Found one movie");
        });
    });
    
    
    app.put('/movies/:id', function(req, res) {
        var id = req.params.id;
        console.log("Recieved a PUT request with id: " + id + " , and data: " + req.body.likes);
        
        db.ratertainment.findAndModify({query: {_id: mongojs.ObjectId(id)},
            update: {$set: { likes: req.body.likes }},
            new: true}, function(err, doc) {
                res.json(doc);
        });
    });
}