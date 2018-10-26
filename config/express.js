/**
 * Express configuration
*/

'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const config = require('./environment');
const cors = require('cors');

module.exports = function (app) {
  const env = app.get('env');  
  const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": true
  };
  app.use(cors(corsOptions));
  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client/dist', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'client/dist')));
    app.set('appPath', path.join(config.root, 'client/dist'));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, 'client/dist')));
    app.set('appPath', path.join(config.root, 'client/dist'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};