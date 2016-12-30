'use strict';

var User = require('../models/').Users;
var Role = require('../models/').Roles;
var Membership = require('../models/').Memberships;
var uuid = require('node-uuid');
var passwordHelpers = require('../helpers/passwordHelper');
var security = require('../helpers/security');

module.exports = {

  create(req, res) {
    var data = req.body;
    var hashPassword = passwordHelpers.hashPassword(data.password);
    var userId =  uuid.v4();
    var reqBody = {
      id: userId,
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashPassword
    };
    User.create(reqBody)
      .then(function (newUser) {
        res.status(201).json(newUser);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  login(req, res) {
    var data = req.body;
    User.findOne({
      where: {
        email: data.email
      }
    }).then(function(user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(500).json({
          errorCode: 4003,
          errorMessage: 'Invalid password'
        });
      }
    }).catch(function(err) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };
    if (data.password) {
      reqBody.password = passwordHelpers.hashPassword(data.password);
    }
    User.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }
};
