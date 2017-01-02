'use strict';

var Membership = require('../models/').Memberships,
    User = require('../models/').Users,
    Role = require('../models/').Roles;

module.exports = {

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
  }

};
