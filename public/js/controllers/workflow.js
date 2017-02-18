App.controller('workflowsController', ['$scope', '$http', '$q', function ($scope, $http, $q) {

  $scope.workflow_types = [];
  $scope.tags = [];
  $scope.currentTag = '';
  $scope.current_flow = null;
  $scope.dialog_loading = true;

  $scope.init = function() {
    $scope.currentTag = LINKEDGOV.getParamVal('tag_id') || '';
    //Get all tags
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tags'
    }).then(function(resp) {
      //success, load to view process
      $scope.tags = resp.data;
    });
    //Get all workflow configure
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: (!!$scope.currentTag) ? ('/api/workflow_configure/?tag_id=' + $scope.currentTag) : '/api/workflow_configure'
    }).then(function(resp) {
      //success, load to view process
      $(document).trigger('linkedgov:loading_stop');
      $scope.workflow_types = resp.data;
    });

    //Handle generate on dialog show
    $('#myGraphModal').on('shown.bs.modal', function () {
      $scope.drawGraph($scope.current_flow);
    });
  };

  $scope.viewProcess = function(item) {
    $scope.current_flow = item.flows;
    $('#myGraphModal').modal({
      show: true
    });
  };

  $scope.drawGraph = function(flows) {
    $scope.generateWorkflow(flows).then(function(data) {
      var nodes = data.nodeArr,
          edges = data.edgeArr;
      // create a network
      var container = document.getElementById('myworkflow');
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new vis.Network(container, data, options);
    });
  };

  $scope.generateWorkflow = function(flows) {
    //{"tasks":
    // [{"process_id":"50365895-eeb8-4342-8a66-2ebbb3fd9c78",
    //   "block_process_id":[]},
    //   {"process_id":"ef768e31-e2c5-4976-a3ab-9db08c76bf28",
    //   "block_process_id":["50365895-eeb8-4342-8a66-2ebbb3fd9c78","85fdcff2-0df1-4c2a-b2b7-5c69c9311f84"]}]}
    var tasks = flows.tasks;
    var nodeHash = [];
    var nodeArr = [{
      id: 1,
      label: '<Start Workflow>',
      shape: 'box'
    }]; //Generate node array
    var edgeArr = []; //Generate edge array
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i],
          process_id = task.process_id,
          block_process = task.block_process_id;
      if (nodeHash.indexOf(process_id) < 0) {
        nodeHash.push(process_id);
          edgeArr.push({
          from: block_process[j],
          to: process_id
        });
      }
      if (block_process.length === 0) {
        edgeArr.push({
          from: 1,
          to: process_id,
          arrows:'to'
        });
      } else {
        for (var j = 0; j < block_process.length; j++) {
          if (nodeHash.indexOf(block_process[j]) < 0) {
            nodeHash.push(block_process[j]);
             edgeArr.push({ //since block_process never been there, it should be execute from the start
              from: 1,
              to: block_process[j],
              arrows:'to'
            });
          }
          edgeArr.push({
            from: block_process[j],
            to: process_id,
            arrows:'to'
          });
        }
      }
    }
    //Start getting all process
    //{"id":"50365895-eeb8-4342-8a66-2ebbb3fd9c78",
    // "name":"Validate registered vehicle",
    // "description":"Task to validate vehicle is registered based on license plate",
    // "department_id":"7582e3ab-670a-4993-aaee-f3006c23598e",
    // "type":"auto-approve",
    // "is_deleted":null,
    // "createdAt":"2017-01-25T14:14:36.000Z",
    // "updatedAt":"2017-01-25T14:14:36.000Z",
    // "Department":{"id":"7582e3ab-670a-4993-aaee-f3006c23598e",
    // "name":"Department of mobility and vehicle",
    // "description":"DMV",
    // "address":null,
    // "phone":"n/a","icon_url":null,
    // "group_email":"dmv@gov.com","unique_code":"DMV",
    // "createdAt":"2016-11-16T14:12:02.000Z","updatedAt":"2016-11-16T14:12:02.000Z"}}
    var deferred = $q.defer();
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_configure?filters=' + nodeHash.join('~')
    }).then(function(resp) {
      for (var i = 0; i < resp.data.length; i++) {
        var node = resp.data[i];
        nodeArr.push({
          id: node.id,
          label: node.Department.unique_code + '\n' + node.name,
          font: {'face': 'Monospace', align: 'center'},
          shape: 'box'
        });
      }
      deferred.resolve({
        nodeArr: nodeArr,
        edgeArr: edgeArr
      });
      $scope.dialog_loading = false;
    });
    return deferred.promise;
  };

  $scope.selectTag = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflow_configure?tag_id=' + $scope.currentTag,
    }).then(function(resp) {
      //success, load to view process
      $scope.workflow_types = resp.data;
      $(document).trigger('linkedgov:loading_stop');
    }, function(err) {
      $(document).trigger('linkedgov:loading_stop');
    });
  };

}]);
