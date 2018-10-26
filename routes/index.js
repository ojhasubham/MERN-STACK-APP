/**
 * Main application routes
 */

'use strict';

const bookRoutes = require('../controllers/books');
const errors = require('../components/errors');
const path = require('path');

module.exports = function (app) {

	// Insert routes below
	app.use('/api/books', bookRoutes);

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
		.get(errors[404]);

	// All other routes should redirect to the index.html
	app.route('/*')
		.get(function (req, res) {
			res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
		});
};