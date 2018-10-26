/**
 * Main application file
 */

'use strict';

// Set default node environment to development
require('dotenv').load();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const config = require('./config/environment');

// Setup server
const app = express();
const server = require('http').createServer(app);

// require db connection
require('./config/connection');

//Configure express
require('./config/express')(app);
require('./routes/index')(app);

// Start server
server.listen(config.port, config.ip, function () {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;

