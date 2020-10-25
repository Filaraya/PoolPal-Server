// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:1091MillMar@cluster0.xusy1.mongodb.net/poolpal?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Reading = mongoose.model('Reading', {
    reading_date: Date,
    free_chlorine: Number,
    combined_chlorine: Number,
    ph: Number,
    alkalinity: Number,
    calcium: Number,
    cyanuric_acid: Number
});


// Get all readings
app.get('/api/readings', function(req, res) {

    console.log("Listing readings...");

    //use mongoose to get all readings in the database
    Reading.find(function(err, readings) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(readings); // return all readings in JSON format
    });
});

// Create a reading
app.post('/api/readings', function(req, res) {

    console.log("Creating reading...");

    Reading.create({
        reading_date: req.body.reading_date,
        free_chlorine: req.body.free_chlorine,
        combined_chlorine: req.body.combined_chlorine,
        ph: req.body.ph,
        alkalinity: req.body.alkalinity,
        calcium: req.body.calcium,
        cyanuric_acid: req.body.cyanuric_acid
    }, function(err, reading) {
        if (err) {
            res.send(err);
        }

        // create and return all the readings
        Reading.find(function(err, readings) {
            if (err)
                res.send(err);
            res.json(readings);
        });
    });

});

// Update a reading
app.put('/api/readings/:id', function(req, res) {
    const reading = {
        reading_date: req.body.reading_date,
        free_chlorine: req.body.free_chlorine,
        combined_chlorine: req.body.combined_chlorine,
        ph: req.body.ph,
        alkalinity: req.body.alkalinity,
        calcium: req.body.calcium,
        cyanuric_acid: req.body.cyanuric_acid
    };
    console.log("Updating item - ", req.params.id);
    Reading.update({ _id: req.params.id }, reading, function(err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a reading
app.delete('/api/readings/:id', function(req, res) {
    Reading.remove({
        _id: req.params.id
    }, function(err, reading) {
        if (err) {
            console.error("Error deleting reading ", err);
        } else {
            Reading.find(function(err, readings) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(readings);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("PoolPal server listening on port  - ", (process.env.PORT || 8080));