'use strict';

var Notification = require('../models/').Notifications,
    uuid = require('uuid/v4'),
    User = require('../models/').Users;

module.exports = {

  show_workflow(req, res) {
    Notification.findAll({
      where: {
        task: 'workflow' //task_type
      }
    })
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show_task(req, res) {

  },

  createNotification(task_type, task_id, notification_type, notification_message) {
    var data = {
      id: uuid(),
      task_id: task_id,
      task: task_type, //task_type
      notification_type: notification_type,
      notification_message: notification_message
    };
    Notification.create(data)
    .then(function(resp) {
    })
    .catch(function(err) {
      console.log('Create notification err: ' + err);
    });
  }

};
