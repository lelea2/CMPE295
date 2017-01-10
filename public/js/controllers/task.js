App.controller('tasksController', ['$scope', '$http', function ($scope, $http) {

  $scope.departments = [];
  $scope.tasks = [];
  $scope.currentDepartment = '';

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments'
    }).then(function(resp) {
      //success, load to view process
      $scope.departments = resp.data;
    });
  };

  $scope.selectDepartment = function() {
    if (!!$scope.currentDepartment) {
      $(document).trigger('linkedgov:loading_start');
      $http({
        method: 'GET',
        headers: LINKEDGOV.getHeaders(true),
        url: '/api/process_configure/?department_id=' + $scope.currentDepartment
      }).then(function(resp) {
        $(document).trigger('linkedgov:loading_stop');
        $scope.tasks = resp.data;
      }, function(err) {
        $scope.tasks = [];
        $(document).trigger('linkedgov:loading_stop');
      });
    }
  };

  $scope.editTask = function() {

  };

}]);
