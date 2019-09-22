// dependencies
const bcrypt = require('bcrypt');

// models
const models = require('../models');
const User = models.User;

// constants
const keys = require('../config/constants');
const columns = ["email", "name", "password", "username"];

function registerUser(req, res, next) {

    // only create user if password and email was sent
    if (req.body.email !== undefined && req.body.password !== undefined) {
        // hash the password before storing it
        bcrypt.hash(req.body.password, keys.saltRounds)
            .then(hash => {
                let userObj = {};
                for (let i = 0; i < columns.length; i++) {
                    if (columns[i] === 'password') {
                        userObj['password'] = hash;
                    } else {
                        userObj[columns[i]] = req.body[columns[i]];
                    }
                }
                return User.create(userObj)
            })
            .then(user => {
                res.json({
                    success: true,
                    message: 'User created'
                });
            })
            .catch(err => {
                console.error("error", err['errors']);
                if (err['name'] === 'SequelizeUniqueConstraintError') {
                    console.log("Inside")
                    return next(new Error(err['errors'][0]['message']));
                }
                next(err);
            });
    } else {
        res.json({
            success: false,
            msg: 'Email/Password not valid'
        });
    }
}

module.exports = registerUser;