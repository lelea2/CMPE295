App.controller('tasksController', ['$scope', '$http', function ($scope, $http) {

  $scope.membership = {};
  $scope.tasks = [];

  $scope.init = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/agent_membership'
    }).then(function(resp) {
      //success, load to view process
      console.log(resp.data);
      $scope.membership = resp.data;
      if ($scope.membership.group_type === 'office') {
        $scope.getOffice();
        $scope.getTasksPerOffice();
      } else {
        alert('Current member has not assigned membership for office');
        $(document).trigger('linkedgov:loading_stop');
      }
    });
  };

  $scope.getOffice = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/offices/' + $scope.membership.group_id
    }).then(function(resp) {
      console.log(resp.data);
      $scope.membership.Office = resp.data;
      console.log($scope.membership);
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.getTasksPerOffice = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_office/?office_id=' + $scope.membership.group_id
    }).then(function(resp) {
      console.log(resp.data);
      $scope.tasks = resp.data;
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.viewDetail = function(item) {

  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
