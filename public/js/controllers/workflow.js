App.controller('workflowsController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_types = [];
  $scope.tags = [];
  $scope.currentTag = '';

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
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: (!!$scope.currentTag) ? ('/api/workflow_configure/?tag_id=' + $scope.currentTag) : '/api/workflow_configure'
    }).then(function(resp) {
      //success, load to view process
      $scope.workflow_types = resp.data;
    });
  };

  $scope.viewProcess = function(item) {
    var flows = $scope.generateWorkflow(item.flows);
    $('#myGraphModal').modal({
      show: true
    });
    $scope.drawGraph(flows);
  };

  $scope.drawGraph = function(flows) {
    var nodes = [
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3:\nLeft-Aligned', font: {'face': 'Monospace', align: 'left'}},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5\nLeft-Aligned box', shape: 'box',
       font: {'face': 'Monospace', align: 'left'}}
    ];

    // create an array with edges
    var edges = [
      {from: 1, to: 2, label: 'middle',     font: {align: 'middle'}},
      {from: 1, to: 3, label: 'top',        font: {align: 'top'}},
      {from: 2, to: 4, label: 'horizontal', font: {align: 'horizontal'}},
      {from: 2, to: 5, label: 'bottom',     font: {align: 'bottom'}}
    ];

    // create a network
    var container = document.getElementById('myworkflow');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);
  };

  $scope.generateWorkflow = function(flows) {
    console.log(flows);
    var tasks_arr = []; //array to store unique tasks
    for(var key in flows) {
      if (tasks_arr.indexOf(key) < 0) {
        tasks_arr.push(key);
      } else {
        //don't push to new tasks_arr
      }
    }

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
