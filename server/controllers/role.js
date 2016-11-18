'use strict';

var Roles = require('../models/').Roles;
var uuid = require('node-uuid');

module.exports = {

  showall(req, res) {
    Roles.findAll()
    .then(function (tags) {
      res.status(200).json(tags);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
