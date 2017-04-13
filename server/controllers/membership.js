'use strict';

var Membership = require('../models/').Memberships,
    Permissions = require('../models/').Permissions,
    Permission = require('./permission'),
    User = require('../models/').Users,
    Role = require('../models/').Roles,
    uuid = require('uuid/v4'),
    BPromise = require('bluebird'),
    sequelize = require('sequelize');

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

  //Show membership of user (who might belong to multiple offices)
  show_agent_membership(agent_id, cb, cbError) {
    Membership.findAll({
      where: {
        user_id: agent_id
      },
      include: [User, Role, Permissions]
    })
    .then(function(memberships) {
      cb(memberships[0].dataValues);
    })
    .catch(function (error) {
      cbError(error);
    });
  },

  show(req, res) {
    console.log('show explicit membership...');
    Membership.findAll({
      where: {
        group_id: req.query.group_id,
        group_type: req.query.group_type
      },
      include: [User, Role, Permissions]
    })
    .then(function (memberships) {
      res.status(200).json(memberships);
    })
    .catch(function (error) {
      console.log(error);
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
  },

  //This function is to show member per office
  showMemberPerOffice(grou_id, group_type) {
    return new BPromise(function(resolve, reject) {
      Membership.findAll({
        where: {
          group_id: grou_id,
          group_type: group_type
        },
        include: [Role]
      })
      .then(function(data) {
        resolve(data);
      })
      .catch(function(err) {
        reject(err);
      });
    });
  },

  //Show agent stats on agent page
  show_membership_stat(req, res) {
    Membership.findAll({
      attributes: [
        'role_id',
        [sequelize.literal('COUNT(DISTINCT(Memberships.id))'), 'roles_count']
      ],
      include: [{
        model: Role,
        attributes: ['id', 'role']
      }],
      group: 'Memberships.role_id'
    })
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  }

};
