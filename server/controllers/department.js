'use strict';

var Department = require('../models/').Departments;
var uuid = require('node-uuid');
var BPromise = require('bluebird');
var sequelize = require('sequelize');

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
    var deferred = BPromise.pending(); //Or Q.defer() in Q

    Department.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'department_count']]
    })
    .then(function(result) {
      deferred.resolve(result[0].dataValues);
    })
    .catch(function(error) {
      deferred.reject({err: error});
    });
    return deferred.promise;
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
