'use strict';

var Permission = require('../models/').Permissions;

var DEFAULT_PERMISSION = {
  manage_member: false,
  manage_write: true,
  manage_read: true,
  manage_delete: false
};

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      manage_member: data.manage_member,
      manage_write: data.manage_write,
      manage_read: data.manage_read,
      manage_delete: data.manage_delete
    };
    Permission.create(reqBody)
      .then(function (newPermission) {
        res.status(201).json(newPermission);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      manage_member: data.manage_member,
      manage_write: data.manage_write,
      manage_read: data.manage_read,
      manage_delete: data.manage_delete
    };
    Permission.update(reqBody, {
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
