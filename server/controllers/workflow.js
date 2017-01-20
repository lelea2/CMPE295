'use strict';

var Workflow = require('../models/').Workflows;
var WorkflowType = require('../models/').WorkflowTypes;
var WorkflowFile = require('../models').WorkflowFiles;
var uuid = require('node-uuid');
var sequelize = require('sequelize');

module.exports = {

  show_configure(req, res) {
    var dataBody = {};
    if (!!req.query.tag_id) {
      dataBody = {
        where: {
          tag_id: req.query.tag_id,
          $or: [{is_deleted: null}, {is_deleted: false}]
        }
      };
    } else {
      dataBody = {
        where: {
          $or: [{is_deleted: null}, {is_deleted: false}]
        }
      };
    }
    WorkflowType.findAll(dataBody)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

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

  delete_configure(req, res) {
    var reqBody = {
      is_deleted: true
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
    var data = req.body;
    var id =  uuid.v4();
    var reqBody = {
      id: id,
      type_id: data.type_id,
      currentStateId: data.state,
      note: data.note,
      critial: data.critial,
      due_date: data.due_date,
      longitude: data.longitude,
      latitude: data.latitude
    };
    Workflow.create(reqBody)
    .then(function (newRecords) {
      res.status(201).json(newRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      currentStateId: data.state,
      critial: data.critial,
      due_date: data.due_date
    };
    Workflow.update(reqBody, {
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

  show(req,res) {
    Workflow.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      res.status(200).json(data)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  },

  show_files(req, res) {
    WorkflowFile.findAll({
      where: {
        workflow_id: req.params.workflow_id
      }
    })
    .then(function(data) {
      res.status(200).json(data)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  },

  //Query to show collection of certain type of workflow
  show_collection(req, res) {
    var reqBody = {},
        filter = req.query.filter,
        fromDate = req.query.fromDate || new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
        toDate = req.query.toDate || new Date();
    if (filter === 'workflow_type') {
      reqBody = {
        where: {
          type_id: req.query.id,
          createdAt: {
            $lt: fromDate,
            $gt: toDate
          }
        }
      };
    }
    Workflow.findaAll(reqBody)
    .then(function(data) {
      res.status(200).json(data)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  },

  //Showing number statistic of workflow (for displaying)
  show_stats(req, res) {
    var fromDate = req.query.fromDate || new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
        toDate = req.query.toDate || new Date();
    Workflow.findAll({
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('type_id')), 'no_workflows']]
      },
      where: {
        createdAt: {
          $lt: fromDate,
          $gt: toDate
        }
      },
      include: [WorkflowType]
    })
    .then(function(data) {
      res.status(200).json(data)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  }

};

