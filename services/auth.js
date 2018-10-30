/**
 * Authentication with passport
 */

'use strict';

const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const UserModel = require('../models/User');
const config = require('../config/environment');
const { USER_NOT_FOUND, LOGGED_IN_SUCCESSFULLY, PASSWORD_WRONG } = require('../constant');
const secretValue = process.env && process.env.SECRET_VALUE ? process.env.SECRET_VALUE : config.secret;

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, cb) {
    return UserModel.create({ "email": email, "password": password })
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, cb) {
    return UserModel.findOne({ "email": email })
        .then(user => {
            if (!user) {
                return cb(null, false, { message: USER_NOT_FOUND });
            }
            user.isValidPassword(password)
                .then(status => {
                    if (status) {
                        return cb(null, user, {
                            message: LOGGED_IN_SUCCESSFULLY
                        });
                    } else {
                        return cb(null, false, { message: PASSWORD_WRONG });
                    }
                })
        })
        .catch(err => {
            return cb(err);
        });
}
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('token'),
    secretOrKey: secretValue,
}, function (jwtPayload, cb) {
    let { data: { _id } } = jwtPayload;
    return UserModel.findOne({ "_id": _id })
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
))