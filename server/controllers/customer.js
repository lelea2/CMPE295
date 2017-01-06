'use strict';

var Customer = require('../models/').Customers;
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
    Customer.create(reqBody)
      .then(function (newCustomer) {
        res.status(201).json(newCustomer);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    var data = req.body;
    Customer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(customer) {
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(500).json({
          errorCode: 4003,
          errorMessage: 'Invalid id'
        });
      }
    }).catch(function(err) {
      res.status(500).json(error);
    });
  },

  login(req, res) {
    var data = req.body;
    Customer.findOne({
      where: {
        email: data.email
      }
    }).then(function(customer) {
      if (passwordHelpers.verifyPassword(data.password, customer.password)) {
        if (req.headers.setcookie === 'true') {
          security.setUserCookie(req, {
            id: customer.id,
            role: 'customer'
          });
        }
        res.status(200).json(customer);
      } else {
        res.status(500).json({
          errorCode: 4003,
          errorMessage: 'Invalid password'
        });
      }
    }).catch(function(err) {
      res.status(500).json(err);
    })
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
    Customer.update(reqBody, {
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
