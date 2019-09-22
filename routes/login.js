// dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// models
const models = require('../models');
const User = models.User;
const UserToken = models.UserToken;
// constants
const keys = require('../config/constants');


function verifyUser(req, res, next) {
    let userDetails = {};
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            userDetails = (user !== null) ? user.dataValues : null;
            // console.log(userDetails)
            if (userDetails === null)
                throw new Error('User not found');
            else if (!userDetails.isBlocked)
                return bcrypt.compare(req.body.password, user.dataValues.password);
        })
        .then(isSame => {
            if (isSame) {
                const payload = {
                    name: userDetails.name,
                    email: req.body.email,
                    userId: userDetails.userId
                }

                jwt.sign(payload, keys.secret, (err, token) => {
                    if (err) {
                        return next(err);
                    }

                    res.json({
                        token,
                        data: {
                            name: userDetails.name,
                            email: userDetails.email,
                            userId: userDetails.userId
                        },
                        success: true
                    })

                    UserToken.create({
                        token: token,
                        userId: userDetails.userId,
                        name: userDetails.name
                    })

                })
            } else {
                res.json({
                    msg: "Incorrect password/email",
                    success: false
                });

            }
        })
        .catch(err => {
            console.error(err)
            next(err);
        })

};


module.exports = verifyUser;