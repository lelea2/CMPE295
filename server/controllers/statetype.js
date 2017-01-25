'use strict';

var StateType = require('../models/').StateTypes;

module.exports = {

  showall(req, res) {
    StateType.findAll()
    .then(function (types) {
      res.status(200).json(types);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
