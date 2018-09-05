const jwt = require('jsonwebtoken');
const { getConfig } = require('../../config/config');
//const devConfig =require('../../config/env/development');

//exports.issue = function (payload, expiresIn) {
//    return jwt.sign(payload, devConfig.secret, {
//        expiresIn,
//    });
//};

const config = getConfig(process.env.NODE_ENV);
exports.issue = function(payload, expiresIn) {
        return jwt.sign(payload, config.secret, {
            expiresIn,
        });
};