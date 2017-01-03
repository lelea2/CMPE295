'use strict';

var Workflow = require('../models/').Workflows;
var WorkflowType = require('../models/').WorkflowTypes;
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
      tag_id: data.tag_id,
      flows: data.flows
    };
    WorkflowType.create(reqBody)
      .then(function (newWorkflowType) {
        res.status(201).json(newWorkflowType);
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
      tag_id: data.tag_id,
      flows: data.flows
    };
    WorkflowType.update(reqBody, {
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
