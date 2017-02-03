'use strict';

var Notification = require('../models/').Notifications,
    User = require('../models/').Users;

module.exports = {

  show(req, res) {
    var dataBody = {};
    Notification.findAll({
      where: {
        task_type: 'workflow'
      }
    })
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  create(req, res) {

  }

};
