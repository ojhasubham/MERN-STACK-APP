/**
 * Defining all methods of authentication and business logic for authentication routes
 */

'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/environment');
const secretValue = process.env && process.env.SECRET_VALUE ? process.env.SECRET_VALUE : config.secret;
const { DUPLICATE_EMAIL, SIGN_UP_SUCCESSFUL, SIGN_UP_FAIL, LOG_IN_FAIL, DUPLICATE_ERROR_MATCH_TEXT } = require('../../constant');

module.exports = {
	signup: function (req, res, next) {
		passport.authenticate('signup', { session: false }, (err, user, info) => {
			if (!info)
				info = { message: err && err.errmsg && err.errmsg.includes(DUPLICATE_ERROR_MATCH_TEXT) ? DUPLICATE_EMAIL : null }
			if (err || !user) {
				return res.status(400).json({
					successStatus: false,
					message: info ? info.message : SIGN_UP_FAIL
				});
			} else {
				return res.json({
					successStatus: true,
					message: SIGN_UP_SUCCESSFUL,
					user: req.user
				});
			}
		})(req, res);
	},
	login: function (req, res, next) {
		passport.authenticate('login', { session: false }, (err, user, info) => {
			if (err || !user) {
				return res.status(403).json({
					successStatus: false,
					message: info ? info.message : LOG_IN_FAIL
				});
			}
			req.login(user, { session: false }, (err) => {
				if (err) {
					err.successStatus = false;
					res.send(err);
				}
				const token = jwt.sign({ data: user, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, secretValue);
				let userInfo = {
					successStatus: true,
					_id: user._id,
					email: user.email,
					token: token
				}
				return res.json(userInfo);
			});
		})(req, res);
	}
};
