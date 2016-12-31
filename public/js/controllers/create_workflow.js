App.controller('createWorkflowController', ['$scope', '$http', function ($scope, $http) {

  $scope.formWorkflow = {};
  $scope.tags = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tags'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.tags = resp.data;
    });
  };

  $scope.createWorkflow = function() {

  };

}]);
