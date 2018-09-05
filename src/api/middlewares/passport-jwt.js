const Passport = require('passport');
const PassportJWT = require('passport-jwt');
//const  devConfig  = require('../../config/env/development');
const User = require('../resources/user/user.model');
const { getConfig } = require( '../../config/config');

const config = getConfig(process.env.NODE_ENV);
const configJWTStrategy = () => {
    const opts = {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret,
    };
    Passport.use(
        new PassportJWT.Strategy(opts, (paylod, done) => {
            User.findOne({ _id: paylod.id }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            });
        })
    );
};
module.exports = configJWTStrategy;