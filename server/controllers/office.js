'use strict';

var Office = require('../models/').Offices;
var uuid = require('uuid/v4');
var Department = require('../models/').Departments;
var sequelize = require('sequelize');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid(),
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

  update(req, res) {
    var data = req.body;
    var reqBody = {
      name: data.name,
      description: data.description,
      phone: data.phone,
      group_email: data.group_email,
      unique_code: data.unique_code
    };
    Office.update(reqBody, {
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
  },

  show(req, res) {
    Office.findOne({
      where: {
        id: req.params.id
      },
      include: [Department]
    })
    .then(function (office) {
      res.status(200).json(office);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    Office.destroy({
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
