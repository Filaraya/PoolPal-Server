var express = require('express');
var Chemical = require('../models/chemicals');

var chemicalRouter = express.Router();

chemicalRouter
    .route('/chemicals')
    .post(function(request, response) {
        console.log('POST /chemicals');
        console.log(request.body);

        var chemical = new Chemical(request.body);

        chemical.save();

        response.status(201).send(chemical);
    })
    .get(function(request, response) {
        console.log('GET /chemicals');

        Chemical.find(function(error, chemicals) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(chemicals);

            response.json(chemicals);
        });
    });

module.exports = chemicalRouter;