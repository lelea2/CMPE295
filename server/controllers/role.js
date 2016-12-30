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
    .then(function (roles) {
      res.status(200).json(roles);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      role: data.role
    };
    Roles.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updateRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
