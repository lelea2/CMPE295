'use strict';

var Office = require('../models/').Offices;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      name: data.name,
      description: data.description,
      phone: data.phone,
      group_email: data.group_email,
      unique_code: data.unique_code,
      department_id: req.params.department_id
    };
    Office.create(reqBody)
      .then(function (newOffice) {
        res.status(201).json(newOffice);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  showall(req, res) {
    Office.findAll({
      where: {
        department_id: req.params.department_id
      }
    })
    .then(function (offices) {
      res.status(200).json(offices);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

}
