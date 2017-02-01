App.controller('taskCaseController', ['$scope', '$http', function ($scope, $http) {

  $scope.tasks = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tasks'
    }).then(function(resp) {
      //success, load to view process
      $scope.tasks = resp.data;
    });
  };

}]);
