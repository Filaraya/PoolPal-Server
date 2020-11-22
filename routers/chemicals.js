var express = require('express');
var User = require('../models/user');
var chemicalRouter = express.Router();

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

        var user = User.findOne({ _id: userId });

        console.log(user);

        response.json(user);
    });

module.exports = chemicalRouter;