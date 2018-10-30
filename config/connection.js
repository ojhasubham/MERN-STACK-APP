/**
 * Database connection configuration
*/

'use strict';

const mongoose = require('mongoose');
const config = require('./environment');
const { MONGOLAB_URI } = require('../constant');
console.log('process.env.MONGOLAB_URI', process.env.MONGOLAB_URI)
mongoose.connect(process.env.MONGOLAB_URI || MONGOLAB_URI);
// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
    console.log('Mongoose Default Connection Error : ' + err);
});
