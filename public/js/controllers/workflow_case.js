App.controller('workflowCaseController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_cases = [];
  $scope.processShow = false;

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

  $scope.viewProcess = function(item) {
    var workflow_id = item.id;
    $scope.processShow = true;
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows/' + workflow_id + '/process'
    }).then(function(resp) {
      //success, load to view process
      console.log(resp.data);
    });
  };

  $scope.back = function() {
    $scope.processShow = false;
  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
