const mongoose = require('mongoose');
const config = require('./environment');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://subham:subham123@ds141613.mlab.com:41613/mern_db');
// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
    console.log('Mongoose Default Connection Error : ' + err);
});
