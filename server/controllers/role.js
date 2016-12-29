'use strict';

var Roles = require('../models/').Roles;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      role: data.role
    };
    Roles.create(reqBody)
      .then(function (newRole) {
        res.status(201).json(newRole);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

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
