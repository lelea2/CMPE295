'use strict';

var Membership = require('../models/').Memberships;

module.exports = {

  show(req, res) {
    Membership.findAll({
      where: {
        group_id: req.query.group_id,
        group_type: req.query.group_type
      }
    })
    .then(function (memberships) {
      res.status(200).json(memberships);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
