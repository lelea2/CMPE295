App.controller('workflowCaseController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflows = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows'
    }).then(function(resp) {
      //success, load to view process
      $scope.workflows = resp.data;
    });
  };

}]);
