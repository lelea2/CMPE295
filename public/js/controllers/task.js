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
    $(document).trigger('linkedgov:loading_start');
    $scope.tasks = [];
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tasks_stats'
    }).then(function(resp) {
      //success, load to view process
      $(document).trigger('linkedgov:loading_stop');
      // console.log(resp.data);
      $scope.tasks_stat = resp.data;
      $scope.drawPieChart();
    });
  };

  $scope.drawPieChart = function() {
    var data = $scope.tasks_stat;
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      arr.push({
        label: obj.Department.unique_code,
        value: obj.tasks_count
      });
    }
    //Generate morris chart
    Morris.Donut({
      element: 'task-donut',
      data: arr,
      colors: ["#0078d7", "#018574", "#ffb900", "#744d89", "#E74856", "#FF8C00", "#E300BC"],
      resize: true,
      redraw: true
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
      // window.location.reload('/?department_id=' + $scope.formTask.department_id);
      $scope.loadTasksPerDepartment();
      //hide modal
      $('#myTaskModal').modal({
        show: false
      });
    });
  };

}]);
