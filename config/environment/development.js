'use strict';

// Development specific configuration
// ==================================

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: `mongodb://localhost/demo-dev`
  },
  seedDB: false
};

// const dbuser = 'abcd';
// const dbpassword = 'abcd12';

// const MONGODB_URI = `mongodb://${dbuser}:${dbpassword}@ds125453.mlab.com:25453/mern-example`;

// module.exports = MONGODB_URI;
