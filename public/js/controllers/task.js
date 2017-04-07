App.controller('tasksController', ['$scope', '$http', function ($scope, $http) {

  $scope.departments = [];
  $scope.tasks = [];
  $scope.tasks_stat = [];
  $scope.currentDepartment = '';
  $scope.formTask = {};

  $scope.init = function() {
    $scope.currentDepartment = LINKEDGOV.getParamVal('department_id') || '';
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments'
    }).then(function(resp) {
      //success, load to view process
      $(document).trigger('linkedgov:loading_stop');
      $scope.departments = resp.data;
    });

    $scope.loadTasksPerDepartment();
    $scope.loadTasksStat();
  };

  $scope.loadTasksStat = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tasks_stats'
    }).then(function(resp) {
      //success, load to view process
      // $(document).trigger('linkedgov:loading_stop');
      console.log(resp.data);
      $scope.tasks_stat = resp.data;
    });
  };

  $scope.loadTasksPerDepartment = function() {
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

  $scope.selectDepartment = function() {
    $scope.loadTasksPerDepartment();
  };

  $scope.editTask = function(item) {
    // console.log(item);
    // console.log('edit task');
    $scope.formTask = item;
    $('#myTaskModal').modal({
      show: true
    });
  };

  $scope.updateTask = function() {
    $http({
      method: 'PUT',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_configure/' + $scope.formTask.id,
      data: $scope.formTask
    }).then(function(resp) {
      //success, load to view process
      window.location.reload('/?department_id=' + $scope.formTask.department_id);
    });
  };

}]);
