App.controller('workflowsController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_types = [];
  $scope.tags = [];
  $scope.currentTag = '';

  $scope.init = function() {
    //Get all tags
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tags',
    }).then(function(resp) {
      //success, load to view process
      $scope.tags = resp.data;
    });
    //Get all workflow configure
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflow_configure',
    }).then(function(resp) {
      //success, load to view process
      $scope.workflow_types = resp.data;
    });
  };

  $scope.viewProcess = function(item) {
    var flows = item.flows;
    $('#myGraphModal').modal({
      show: true
    });
  };

  $scope.generateWorkflow = function(flows) {

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
