'use strict';

var Process = require('../models/').Processes;
var ProcessType = require('../models/').ProcessTypes;
var ProcessFile = require('../models/').ProcessFiles;
var ProcessAdmin = require('../models/').ProcessAdmin;
var Department = require('../models/').Departments;
var Office = require('../models/').Offices;
var StateType = require('../models').StateTypes;
var User = require('../models/').Users;
var uuid = require('uuid/v4');
var BPromise = require('bluebird');
var sequelize = require('sequelize');

module.exports = {

  //Configure new workflow type
  configure(req, res) {
    var data = req.body;
    var id =  uuid();
    var reqBody = {
      id: id,
      name: data.name,
      description: data.description,
      department_id: data.department_id,
      type: data.type
    };
    ProcessType.create(reqBody)
      .then(function (newProcessType) {
        res.status(201).json(newProcessType);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show_configure(req, res) {
    var dataBody = {};
    if (!!req.query.filters) {
      dataBody = {
        where: {
          id: {
            $in: req.query.filters.split('~')
          },
          $or: [{is_deleted: null}, {is_deleted: false}]
        },
        include: [Department]
      };
    } else if (!!req.query.department_id) {
      dataBody = {
        where: {
          department_id: req.query.department_id,
          $or: [{is_deleted: null}, {is_deleted: false}]
        },
        include: [Department]
      };
    } else {
      dataBody = {
        where: {
          $or: [{is_deleted: null}, {is_deleted: false}]
        },
        include: [Department]
      };
    }
    ProcessType.findAll(dataBody)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show_configure_stat(req, res) {
    var deferred = BPromise.pending(); //Or Q.defer() in Q
    ProcessType.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'tasks_configure_count']],
      where: {
        $or: [{is_deleted: null}, {is_deleted: false}]
      }
    })
    .then(function(result) {
      deferred.resolve(result[0].dataValues);
    })
    .catch(function(error) {
      deferred.reject({err: error});
    });
    return deferred.promise;
  },

  update_configure(req, res) {
    var data = req.body;
    var reqBody = {
      name: data.name,
      description: data.description,
      type: data.type
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

  create_new_process(data) {
    var deferred = BPromise.pending(); //Or Q.defer() in Q
    var reqBody = {
      id: data.id,
      workflow_id: data.workflow_id,
      enabled_flag: data.enabled_flag,
      currentStateId: data.currentStateId,
      block_states: data.block_states,
      process_type: data.process_type,
      critical: data.critical,
      due_date: data.due_date,
      office_id: data.office_id
    };
    Process.create(reqBody)
    .then(function(result) {
      deferred.resolve(result);
    })
    .catch(function(error) {
      deferred.reject({err: error});
    });
    return deferred.promise;
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      enabled_flag: data.enabled_flag,
      currentStateId: data.currentStateId,
      critial: data.critical,
      due_date: data.due_date
    };
    Process.update(reqBody, {
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
  },

  show_task_admin(req, res) {
    ProcessAdmin.findAll({
      where: {
        process_id: {
          $in: req.query.filters.split('~')
        }
      },
      include: [User]
    })
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json(error);
    });
  },

  //http://stackoverflow.com/questions/22643263/how-to-get-a-distinct-count-with-sequelize
  //SELECT process_type, COUNT(DISTINCT(office_id)) as 'countOfOfficeId' GROUP BY process_type
  process_stat(req, res) {
    Process.findAll({
      attributes: [
        'process_type',
        [sequelize.literal('COUNT(DISTINCT(office_id))'), 'countOfOfficeId']
      ],
      group: 'process_type'
    })
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  process_per_department(req, res) {
    ProcessType.findAll({
      attributes: [
        'department_id',
        [sequelize.literal('COUNT(DISTINCT(ProcessTypes.id))'), 'tasks_count']
      ],
      include: [{
        model: Department,
        attributes: ['id', 'unique_code']
      }],
      group: 'ProcessTypes.department_id'
    })
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  },

  //Adding process per office
  process_per_office(office_id, res) {
    ProcessAdmin.findAll({
      where: {
        office_id: office_id
      },
      include: [Process]
    })
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  },

  //Getting process per workflow
  process_per_workflow(req, res) {
    Process.findAll({
      where: {
        workflow_id: req.params.id
      },
      include: [ProcessType, StateType, Office]
    })
    .then(function(data) {
      console.log('>>>>> Getting data <<<<<<');
      //console.log(data);
      var arr = [];
      for ( var i = 0; i < data.length; i++) {
        var obj = data[i].dataValues;
        arr.push({
          id: obj.id,
          enabled_flag: obj.enabled_flag,
          currentStateId: obj.currentStateId,
          critical: obj.critical,
          block_states: JSON.parse(obj.block_states.toString('utf-8')).states,
          ProcessType: obj.ProcessType,
          StateType: obj.StateType,
          Office: obj.Office || {}
        });
      }
      res.status(200).json(arr);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
  }

};
