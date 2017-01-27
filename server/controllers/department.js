'use strict';

var Department = require('../models/').Departments;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body;
    // console.log(data);
    var reqBody = {
      id: uuid.v4(),
      name: data.name,
      description: data.description,
      phone: data.phone,
      group_email: data.group_email,
      unique_code: data.unique_code
    };
    Department.create(reqBody)
      .then(function (newDepartment) {
        res.status(201).json(newDepartment);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Department.findById(req.params.id)
    .then(function (department) {
      res.status(200).json(department);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show_stat(req, res) {
    Department.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
    })
    .then(function (department) {
      res.status(200).json(department);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  showall(req, res) {
    Department.findAll()
    .then(function (departments) {
      res.status(200).json(departments);
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
    Department.update(reqBody, {
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

  delete(req, res) {
    Department.destroy({
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
