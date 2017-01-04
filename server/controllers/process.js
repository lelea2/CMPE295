'use strict';

var Process = require('../models/').Processes;
var ProcessType = require('../models/').ProcessTypes;
var ProcessAdmin = require('../models/').ProcessAdmins;
var User = require('../models/').Users;
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

  delete_configure(req, res) {
    var reqBody = {
      is_deleted: true
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
    var data = req.body;
    var id =  uuid.v4();
    var reqBody = {
      id: id,
      workflow_id: data.workflow_id,
      enabled_flag: data.enabled_flag,
      currentStateId: data.currentStateId,
      next_states: data.next_states,
      process_type: data.process_type,
      critial: data.critical,
      due_date: data.due_date
    };
    Process.create(reqBody)
      .then(function (newProcess) {
        res.status(201).json(newProcess);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show_per_agent(req, res) {
    ProcessAdmin.findAll({
      where: {
        user_id: req.query.agent_id
      },
      include: [User, Process]
    })
    .then(function (processes) {
      res.status(200).json(processes);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
