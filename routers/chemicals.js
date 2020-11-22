var express = require('express');
var User = require('../models/user');
var chemicalRouter = express.Router();

const targetPh = 7.4;
const phUpAmountOz = 60;
const phDownAmountOz = 12;

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
                console.log('Add ' + (targetPh - ph) * phUpAmountOz * user.pool_gallons / 10000 + ' oz of ' + user.chemicals[0].ph_up);
            }
            if (ph > targetPh) {
                console.log('Add ' + (ph - targetPh) * phDownAmountOz * user.pool_gallons / 10000 + ' oz of ' + user.chemicals[0].ph_down);
            }
        });

        response.json(user);
    });

module.exports = chemicalRouter;