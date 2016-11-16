'use strict';

//Testing DB connection
// var models = require('./server/models/');
// models.sequelize
//   .authenticate()
//   .then(function () {
//     console.log('Connection successful');
//   })
//   .catch(function(error) {
//     console.log("Error creating connection:", error);
//   });

var express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    csrfCrypto = require('csrf-crypto');


app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'));
});
