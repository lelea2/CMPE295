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

  $scope.viewProcess = function() {

  };

  $scope.selectTag = function() {

  };

}]);
