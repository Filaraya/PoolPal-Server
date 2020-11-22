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
    })

chemicalRouter
    .route('/chemicals/:chemicalId')
    .delete(function (request, response) {
        console.log('DELETE /chemicals/:chemicalId');

        var chemicalId = request.params.chemicalId;

        Chemical.findOne({ _id: chemicalId }, function (error, chemical) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (chemical) {
                chemical.remove(function (error) {
                    if (error) {
                        response.status(500).send(error);
                        return;
                    }

                    response.status(200).json({
                        message: 'Chemical with id ' + chemicalId + ' was removed.',
                    });
                });
            } else {
                response.status(404).json({
                    message: 'Chemical with id ' + chemicalId + ' was not found.',
                });
            }
        });
    });
;

module.exports = chemicalRouter;