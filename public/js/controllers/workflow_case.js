App.controller('workflowCaseController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_cases = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows'
    }).then(function(resp) {
      //success, load to view process
      console.log(resp.data);
      $scope.workflow_cases = resp.data;
    });
  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
