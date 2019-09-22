const jwt = require('jsonwebtoken');
const secret = require('../config/constants').secret;
const UserToken = require('../models').UserToken;
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, secret, (err, authData) => {
            if (err) {
                err = new Error("Authentication failed");
                err.status = 403;
                next(err);
            }
            req.token = bearerToken;
            console.log("Auth data", authData);
            req.authData = authData;
            UserToken.findAll({
                where: {
                    token: bearerToken
                }
            }).then(userToken => {
                if (userToken.length === 0) {
                    const error = new Error("user not logged in");
                    error.status = 403;
                    next(error);
                }
            })
                .catch(err => {
                    console.error(err);
                    return next(err);
                })
            next();
        });
    }
    else {
        res.json({
            "Message": "Authentication Failed",
            "status": 403
        });

    }
}


module.exports = verifyToken;
