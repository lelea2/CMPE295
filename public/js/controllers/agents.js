App.controller('agentsController', ['$scope', '$http', function ($scope, $http) {

  $scope.agents = [];
  $scope.departments = [];
  $scope.offices = [];
  $scope.currentDepartment = null;
  $scope.currentOffice = null;
  $scope.showOffice = false;

  $scope.init = function() {
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
  };

  $scope.selectDepartment = function() {
    $scope.showOffice = true;
    $scope.loadOffices();
  };

  $scope.selectOffice = function() {
    $scope.loadMemberships('office', $scope.currentOffice);
  };

  $scope.loadMemberships = function(group_type, group_id) {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/memberships?group_type=' + group_type + '&group_id=' + group_id
    }).then(function(resp) {
      //success, load to view process
      $(document).trigger('linkedgov:loading_stop');
      $scope.agents = resp.data;
    });
  };

  $scope.loadOffices = function() {
    if (!!$scope.currentDepartment) {
      $(document).trigger('linkedgov:loading_start');
      $http({
        method: 'GET',
        headers: LINKEDGOV.getHeaders(true),
        url: '/api/departments/' + $scope.currentDepartment + '/offices'
      }).then(function(resp) {
        $(document).trigger('linkedgov:loading_stop');
        $scope.offices = resp.data;
      }, function(err) {
        $scope.offices = [];
        $(document).trigger('linkedgov:loading_stop');
      });
    }
  };

  /**
   * Helper function to edit permission
   */
  $scope.editAgent = function(agent) {

  };

}]);
