App.controller('createAgentController', ['$scope', '$http', function ($scope, $http) {

  $scope.formAgent = {};
  $scope.roles = [];
  $scope.departments = [];
  $scope.offices = [];
  $scope.currentDepartmentId = null;
  $scope.showAgentForm = true;

  $scope.init = function() {

  };

  $scope.getRoles = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/roles'
    }).then(function(resp) {
      $scope.roles = resp.data;
    });
  };

  $scope.getDepartments = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments'
    }).then(function(resp) {
      $scope.departments = resp.data;
    });
  };

  $scope.getOffices = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/offices?department_id=' + $scope.currentDepartmentId
    }).then(function(resp) {
      $scope.offices = resp.data;
    });
  };

  $scope.createAgent = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/agents',
      data: $scope.formAgent
    }).then(function(resp) {

    });
  };

  $scope.createMembership = function() {

  };

}]);
