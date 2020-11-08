var express = require('express');
var User = require('../models/user');

var userRouter = express.Router();

userRouter
    .route('/users')
    .post(function(request, response) {
        console.log('POST /users');
        console.log(request.body);

        var user = new User(request.body);

        user.save();

        response.status(201).send(user);
    })
    .get(function(request, response) {
        console.log('GET /users');

        User.find(function(error, users) {
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
    .post(function(request, response) {
        console.log('GET /users/login');
        console.log(request.body);

        var userEmail = request.body.email;
        var userPassword = request.body.password;

        console.log(userEmail);

        User.findOne({ email: userEmail }, function(error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(user);

            if (user.password == userPassword) {
                console.log('authenticated');
                response.json(user);
            }
            else {
                console.log('incorrect password');
                response.json('incorrect password');
            }

        });
    })


userRouter
    .route('/users/:userId')
    .get(function(request, response) {
        console.log('GET /users/:userId');

        var userId = request.params.userId;

        console.log(userId);

        User.findOne({ _id: userId }, function(error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(user);

            response.json(user);
        });
    })
    .put(function(request, response) {
        console.log('PUT /users/:userId');

        var userId = request.params.userId;

        User.findOne({ _id: userId }, function(error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (user) {
                user.user_date = request.body.user_date;
                user.free_chlorine = request.body.free_chlorine;
                user.combined_chlorine = request.body.combined_chlorine;
                user.ph = request.body.ph;
                user.alkalinity = request.body.alkalinity;
                user.calcium = request.body.calcium;
                user.cyanuric_acid = request.body.cyanuric_acid;

                user.save();

                response.json(user);
                return;
            }

            response.status(404).json({
                message: 'User with id ' + userId + ' was not found.',
            });
        });
    })
    .patch(function(request, response) {
        console.log('PATCH /users/:userId');

        var userId = request.params.userId;

        User.findOne({ _id: userId }, function(error, user) {
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

                response.json(user);
                return;
            }

            response.status(404).json({
                message: 'User with id ' + userId + ' was not found.',
            });
        });
    })
    .delete(function(request, response) {
        console.log('DELETE /users/:userId');

        var userId = request.params.userId;

        User.findOne({ _id: userId }, function(error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }

            if (user) {
                user.remove(function(error) {
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