var express = require('express');
var User = require('../models/user');
var chemicalRouter = express.Router();

const targetPh = 7.4;
const phUpAmountOz = 60;
const phDownAmountOz = 12;

const targetAlkalinity = 100;
const alkalinityUpAmountLbs = 1.5;

chemicalRouter
    .route('/chemicals')
    .get(function(request, response) {
        console.log('GET /chemicals');

        var alkalinity = request.body.alkalinity;
        var calcium = request.body.calcium;
        var combinedChlorine = request.body.combined_chlorine;
        var cyanuricAcid = request.body.cyanuric_acid;
        var freeChlorine = request.body.free_chlorine;
        var ph = request.body.ph;
        var userId = request.body.user_id;

        User.findOne({ _id: userId }, function(error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (ph < targetPh) {
                console.log('Add ' + (targetPh - ph) * phUpAmountOz * user.pool_gallons / 10000 + ' oz of ' + user.chemicals[0].ph_up + ' to raise pH to ' + targetPh);
            }
            if (ph > targetPh) {
                console.log('Add ' + (ph - targetPh) * phDownAmountOz * user.pool_gallons / 10000 + ' oz of ' + user.chemicals[0].ph_down + ' to reduce pH to ' + targetPh);
            }
            if (alkalinity < targetAlkalinity) {
                console.log('Add ' + (targetAlkalinity - alkalinity) / 10 * alkalinityUpAmountLbs * user.pool_gallons / 10000 + ' lbs of ' + user.chemicals[0].alkalinity_up + ' to raise alkalinity to ' + targetAlkalinity);
            }
            console.log(user);
        });


        response.json(user);
    });

module.exports = chemicalRouter;