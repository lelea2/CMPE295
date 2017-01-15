App.controller('createWorkflowController', ['$scope', '$http', function ($scope, $http) {

  $scope.formWorkflow = {};
  $scope.tags = [];
  $scope.processes = [];
  $scope.choices = [{
    process_id: '',
    block_process_id: []
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
      data: $scope.generateWorkFlow()
    }).then(function(resp) {
      //success, load to view process
      window.location = '/workflows?created=true';
    });
  };

  $scope.generateWorkFlow = function() {
    return {
      name: $scope.formWorkflow.name,
      description: $scope.formWorkflow.description,
      tag_id: $scope.formWorkflow.tag_id,
      flows: {
        tasks: $scope.choices
      }
    };
  };

  $scope.addChoices = function() {
    $scope.choices.push({
      process_id: '',
      block_process_id: []
    });
  };

  $scope.removeItem = function(index) {
    // console.log(index);
    if ($scope.choices.length > 0) {
      $scope.choices.splice(index, 1);
    }
  };

}]);
