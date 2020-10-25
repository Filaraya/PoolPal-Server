var express = require('express');
var Reading = require('../models/reading');

var readingRouter = express.Router();

readingRouter
    .route('/readings')
    .post(function(request, response) {
        console.log('POST /readings');
        console.log(request.body);

        var reading = new Reading(request.body);

        reading.save();

        response.status(201).send(reading);
    })
    .get(function(request, response) {
        console.log('GET /readings');

        Reading.find(function(error, readings) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(readings);

            response.json(readings);
        });
    });

readingRouter
    .route('/readings/:readingId')
    .get(function(request, response) {
        console.log('GET /readings/:readingId');

        var readingId = request.params.readingId;

        console.log(readingId);

        Reading.findOne({ _id: readingId }, function(error, reading) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(reading);

            response.json(reading);
        });
    })
    .put(function(request, response) {
        console.log('PUT /readings/:readingId');

        var readingId = request.params.readingId;

        Reading.findOne({ id: readingId }, function(error, reading) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (reading) {
                reading.reading_date = request.body.reading_date;
                reading.free_chlorine = request.body.free_chlorine;
                reading.combined_chlorine = request.body.combined_chlorine;
                reading.ph = request.body.ph;
                reading.alkalinity = request.body.alkalinity;
                reading.calcium = request.body.calcium;
                reading.cyanuric_acid = request.body.cyanuric_acid;

                reading.save();

                response.json(reading);
                return;
            }

            response.status(404).json({
                message: 'Reading with id ' + readingId + ' was not found.',
            });
        });
    })
    .patch(function(request, response) {
        console.log('PATCH /readings/:readingId');

        var readingId = request.params.readingId;

        Reading.findOne({ id: readingId }, function(error, reading) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (reading) {
                for (var property in request.body) {
                    if (request.body.hasOwnProperty(property)) {
                        if (typeof reading[property] !== 'undefined') {
                            reading[property] = request.body[property];
                        }
                    }
                }

                reading.save();

                response.json(reading);
                return;
            }

            response.status(404).json({
                message: 'Reading with id ' + readingId + ' was not found.',
            });
        });
    })
    .delete(function(request, response) {
        console.log('DELETE /readings/:readingId');

        var readingId = request.params.readingId;

        Reading.findOne({ id: readingId }, function(error, reading) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (reading) {
                reading.remove(function(error) {
                    if (error) {
                        response.status(500).send(error);
                        return;
                    }

                    response.status(200).json({
                        message: 'Reading with id ' + readingId + ' was removed.',
                    });
                });
            } else {
                response.status(404).json({
                    message: 'Reading with id ' + readingId + ' was not found.',
                });
            }
        });
    });

module.exports = readingRouter;