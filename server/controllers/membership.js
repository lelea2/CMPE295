'use strict';

var Membership = require('../models/').Memberships,
    Permission = require('./permission'),
    User = require('../models/').Users,
    Role = require('../models/').Roles,
    uuid = require('uuid/v4');

module.exports = {

  create(req, res) {
    var id =  uuid();
    var data = req.body;
    Permission.create_default(function(resp) {
      Membership.create({
        id: id,
        user_id: data.user_id,
        group_id: data.group_id,
        group_type: data.group_type,
        role_id: data.role_id,
        permission_id: resp.id
      })
      .then(function (newRecord) {
        res.status(201).json(newRecord);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
    }, function(err) {
      res.status(500).json(err);
    });
  },

  show_agent_membership(req, res) {
    Membership.findAll({
      where: {
        user_id: req.params.agent_id
      },
      include: [User, Role]
    })
    .then(function(memberships) {
      res.status(200).json(memberships);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Membership.findAll({
      where: {
        group_id: req.query.group_id,
        group_type: req.query.group_type
      },
      include: [User, Role]
    })
    .then(function (memberships) {
      res.status(200).json(memberships);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    Membership.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var reqBody = {
      role_id: req.body.role_id
    };
    Membership.update(reqBody, {
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
