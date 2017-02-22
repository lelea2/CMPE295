'use strict';

var Workflow = require('../models/').Workflows;
var WorkflowType = require('../models/').WorkflowTypes;
var WorkflowFile = require('../models').WorkflowFiles;
var WorklowCustomer = require('../models').WorklowCustomers;
var StateType = require('../models').StateTypes;
var NotificationCtrl = require('./notification');
var ProcessCtrl = require('./process');
var uuid = require('uuid/v4');
var sequelize = require('sequelize');
var BPromise = require('bluebird');
var cities = require('cities');
var Region = require('../models').Regions;
// cities.gps_lookup(37.27, -121.86)
// { zipcode: '95136',
//   state_abbr: 'CA',
//   latitude: '37.269343',
//   longitude: '-121.84939',
//   city: 'San Jose',
//   state: 'California',
//   distance: 0.941698561849326 }

/**
 * Helper function to generate manage process for running query, create dependencies
 * {"tasks": [
    {"process_id":"50365895-eeb8-4342-8a66-2ebbb3fd9c78",
      "block_process_id":[]},
    {"process_id":"ef768e31-e2c5-4976-a3ab-9db08c76bf28",
      "block_process_id":["50365895-eeb8-4342-8a66-2ebbb3fd9c78","85fdcff2-0df1-4c2a-b2b7-5c69c9311f84"]}]}
 */
// id: data.id,
// workflow_id: data.workflow_id,
// enabled_flag: data.enabled_flag,
// currentStateId: data.currentStateId,
// block_states: data.block_states,
// process_type: data.process_type, //process_id
// critial: data.critical,
// due_date: data.due_date
function manageProcesses(workflow_type_id, workflow_id, critical_id) {
  console.log(">>>>>>>>>> Create process details <<<<<<<<<<<<< ")
  show_configure_one(workflow_type_id, function(tasks_arr) {
    var hashArr = []; //keep track of unique process_id
    var processArr = [];
    var processObj = []; //object of process object
    var funcArr = [];
    for(var i = 0; i < tasks_arr.length; i++) {
      var process_id = tasks_arr[i].process_id,
          block_process_id = tasks_arr[i].block_process_id;
      if (hashArr.indexOf(process_id) < 0) {
        hashArr.push(process_id);
        processArr.push(uuid()); //process detail created has the same index as process
      }
      for (var k = 0; k < block_process_id.length; k++) {
        if (hashArr.indexOf(block_process_id[k]) < 0) {
          hashArr.push(block_process_id[k]);
          processArr.push(uuid());
        }
      }
    }
    for (var i = 0; i < hashArr.length; i++) {
      var obj = {
        id: processArr[i],
        workflow_id: workflow_id,
        enabled_flag: true, //default enabled_flag is true
        currentStateId: 1, //state type should be open initially
        block_states: {
          states: getBlockStates(getObject(tasks_arr, hashArr[i]), hashArr, processArr)
        },
        process_type: hashArr[i],
        critical: critical_id,
        due_date: setDate()
      }
      console.log(obj);
      funcArr.push(ProcessCtrl.create_new_process(obj));
    }
    BPromise.all(funcArr).then(function(result) {
      console.log('All processes created...');
    }, function(err) {
      console.log(err);
    });
  }, function(error) {
    console.log(error);
  });
}

/******************************************************************/
/** Start helper functions to generate process **/

function getBlockStates(arr, hashArr, processArr) {
  console.log(">>> Get Block states");
  if (arr.length === 0) {
    console.log(">>>> No block state");
    return [];
  }
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(processArr[hashArr.indexOf(arr[i])]);
  }
  console.log(result);
  return result;
}

function getObject(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].process_id === value) {
      return arr[i].block_process_id;
    }
  }
  return [];
}

function setDate() {
  var now = new Date();
  var THIRTY_DAYS = 20 * 24 * 60 * 60 * 1000;
  var twentyDaysFromNow = now + THIRTY_DAYS;
  return twentyDaysFromNow;
}

/******************************************************************/

function show_configure_one(workflow_id, cb, cb_err) {
  console.log(">>>> Workflow_id: " + workflow_id);
  WorkflowType.findOne({
    where: {
      id: workflow_id
    }
  })
  .then(function(result) {
    var data = result.dataValues;
    console.log(data);
    var flows = JSON.parse(data.flows.toString('utf-8'));
    cb(flows.tasks || []);
  })
  .catch(function (error) {
    cb_err(error);
  });
};

/******************************************************************/


module.exports = {

  show_configure(req, res) {
    var dataBody = {};
    if (!!req.params.id) {
      dataBody = {
        where: {
          id: req.params.id
        }
      };
    } else if (!!req.query.tag_id) {
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
      // console.log(Serializer.serializeMany);
      // console.log(data[0].flows.toString('utf-8'));
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        item.flows = JSON.parse(item.flows.toString('utf-8'));
        arr.push(item);
      }
      res.status(200).json(arr);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json(error);
    });
  },

  show_configure_stat(req, res) {
    var deferred = BPromise.pending(); //Or Q.defer() in Q
    WorkflowType.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'workflow_configure_count']],
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

  //Configure new workflow type
  configure(req, res) {
    var data = req.body;
    var id =  uuid();
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
        console.log(error);
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
    var id =  uuid();
    var reqBody = {
      id: id,
      type_id: data.type_id,
      currentStateId: 1, //data.state, ==> Initial state of workflow is open
      note: data.note,
      critical: data.critical,
      due_date: data.due_date || setDate(),
      longitude: data.longitude,
      latitude: data.latitude,
      processed: false //Initial workflow create should be false
    };
    Workflow.create(reqBody)
    .then(function (newRecords) {
      //Create notification
      if (!!data.file) {
        WorkflowFile.create({
          id: uuid(),
          worflow_id: newRecords.id,
          filename: data.filename,
          mimeType: data.mimeType,
          file: data.file //fileurl
        })
        .then(function(record) {
          //crate file
        })
        .catch(function(error2) {
        });
      }
      manageProcesses(data.type_id, id, data.critial); //workflow_type_id, workflow_critical_id
      NotificationCtrl.createNotification('workflow', newRecords.id, 'created', 'New worfklow has been created');
      res.status(201).json(newRecords);
    })
    .catch(function (error) {
      console.log(error);
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
  },

  //Show workflows by customers id
  //Customer might want to track their own case at this time
  show_by_customer(req, res) {
    WorklowCustomer.findAll({
      where: {
        customer_id: req.headers.u //userId in case of customer logged in
      },
      include: [Workflow]
    })
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
  }

};
