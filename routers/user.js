var express = require('express');
var User = require('../models/user');

var userRouter = express.Router();

userRouter
    .route('/users')
    .post(function (request, response) {
        console.log('POST /users');
        console.log(request.body);

        var user = new User(request.body);

        user.save();

        response.status(201).send(user);
    })
    .get(function (request, response) {
        console.log('GET /users');

        User.find(function (error, users) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(users);

            response.json(users);
        });
    });

userRouter
    .route('/users/login')
    .post(function (request, response) {
        console.log('GET /users/login');
        console.log(request.body);

        var userEmail = request.body.email;
        var userPassword = request.body.password;

        try {
            User.findOne({ email: userEmail }, function (error, user) {
                if (error) {
                    response.status(500).send(error);
                    return;
                }

                console.log(user);

                if (user !== null && user.password == userPassword) {
                    console.log('authenticated');
                    response.json(user);
                }
                else {
                    console.log('incorrect password');
                    response.json('incorrect password');
                }

            });

        } catch (error) {
            console.log('incorrect password');
            response.json('incorrect password');
        }

    })


userRouter
    .route('/users/:userId')
    .get(function (request, response) {
        console.log('GET /users/:userId');

        var userId = request.params.userId;

        console.log(userId);

        User.findOne({ _id: userId }, function (error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(user);

            response.json(user);
        });
    })
    .put(function (request, response) {
        console.log('PUT /users/:userId');
        console.log(request.body);

        var userId = request.params.userId;

        console.log(userId);

        User.findOne({ _id: userId }, function (error, user) {
            if (error) {
                console.log('error finding user');
                response.status(500).send(error);
                return;
            }

            if (user) {
                user.email = request.body.email;
                user.name = request.body.name;
                user.pool_gallons = request.body.pool_gallons;
                user.pool_type = request.body.pool_type;
                user.target_chlorine = request.body.target_chlorine;
                user.target_ph = request.body.target_ph;
                user.target_alkalinity = request.body.target_alkalinity;
                user.target_calcium = request.body.target_calcium;
                user.target_cyanuric_acid = request.body.target_cyanuric_acid;
                user.chemicals.chlorine = request.body.chemicals.chlorine;
                user.chemicals.ph_up = request.body.chemicals.ph_up;
                user.chemicals.ph_down = request.body.chemicals.ph_down;
                user.chemicals.alkalinity_up = request.body.chemicals.alkalinity_up;
                user.chemicals.alkalinity_down = request.body.chemicals.alkalinity_down;
                user.chemicals.calcium_up = request.body.chemicals.calcium_up;
                user.chemicals.calcium_down = request.body.chemicals.calcium_down;

                user.save();

                response.json(user);
                return;
            }

            response.status(404).json({
                message: 'User with id ' + userId + ' was not found.',
            });
        });
    })
    .patch(function (request, response) {
        console.log('PATCH /users/:userId');

        var userId = request.params.userId;

        User.findOne({ _id: userId }, function (error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (user) {
                for (var property in request.body) {
                    if (request.body.hasOwnProperty(property)) {
                        if (typeof user[property] !== 'undefined') {
                            user[property] = request.body[property];
                        }
                    }
                }

                user.save();

                console.log(user);

                response.json(user);
                return;
            }

            response.status(404).json({
                message: 'User with id ' + userId + ' was not found.',
            });
        });
    })
    .delete(function (request, response) {
        console.log('DELETE /users/:userId');

        var userId = request.params.userId;

        User.findOne({ _id: userId }, function (error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (user) {
                user.remove(function (error) {
                    if (error) {
                        response.status(500).send(error);
                        return;
                    }

                    response.status(200).json({
                        message: 'User with id ' + userId + ' was removed.',
                    });
                });
            } else {
                response.status(404).json({
                    message: 'User with id ' + userId + ' was not found.',
                });
            }
        });
    });

module.exports = userRouter;
