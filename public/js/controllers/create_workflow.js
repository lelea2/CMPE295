App.controller('createWorkflowController', ['$scope', '$http', function ($scope, $http) {

  $scope.formWorkflow = {};
  $scope.tags = [];
  $scope.processes = [];
  $scope.blocktasks = [[]]; //block tasks
  $scope.choices = [{
    task_id: '',
    block_tasks: $scope.blocktasks[0]
  }]; //empty 1 choice

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tags'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.tags = resp.data;
    });

    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_configure'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.processes = resp.data;
    });
  };

  $scope.createWorkflow = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflow_configure',
      data: $scope.formWorkflow
    }).then(function(resp) {
      //success, load to view process
      window.location = '/workflows?created=true';
    });
  };

  $scope.addChoices = function() {
    $scope.blocktasks.push([]);
    $scope.choices.push({
      task_id: '',
      block_tasks: []
    });
  };

  $scope.removeItem = function(index) {
    console.log(index);
  };

}]);
