var express = require('express');
var User = require('../models/user');
var chemicalRouter = express.Router();

const targetPh = 7.4;
const phUpAmountOz = 60;

chemicalRouter
    .route('/chemicals')
    .get(function (request, response) {
        console.log('GET /chemicals');

        var alkalinity = request.body.alkalinity;
        var calcium = request.body.calcium;
        var combinedChlorine = request.body.combined_chlorine;
        var cyanuricAcid = request.body.cyanuric_acid;
        var freeChlorine = request.body.free_chlorine;
        var ph = request.body.ph;
        var userId = request.body.user_id;

        User.findOne({ _id: userId }, function (error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log('Add ' + (targetPh - ph) * phUpAmountOz + ' oz of ' + user.chemicals[0].ph_up);
            console.log(user);
            console.log(alkalinity);
        });


        console.log(user);

        response.json(user);
    });

module.exports = chemicalRouter;