'use strict';

var Process = require('../models/').Processes;
var ProcessType = require('../models/').WorkflowType;
var uuid = require('node-uuid');

module.exports = {

  //Configure new workflow type
  configure(req, res) {
    var data = req.body;
    var id =  uuid.v4();
    var reqBody = {
      id: id,
      name: data.name,
      description: data.description,
      department_id: data.department_id
    };
    ProcessType.create(reqBody)
      .then(function (newProcessType) {
        res.status(201).json(newProcessType);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  update_configure(req, res) {
    var data = req.body;
    var reqBody = {
      name: data.name,
      description: data.description,
      department_id: data.department_id
    };
    ProcessType.update(reqBody, {
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

  create(req, res) {

  }
};
