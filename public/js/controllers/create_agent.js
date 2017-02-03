App.controller('createAgentController', ['$scope', '$http', function ($scope, $http) {

  $scope.formAgent = {};
  $scope.formMembership = {};
  $scope.roles = [];
  $scope.departments = [];
  $scope.offices = [];
  $scope.currentDepartmentId = null;
  $scope.showAgentForm = true;
  $scope.showAgentMembership = false;
  $scope.showOffices = false;

  $scope.init = function() {
    $scope.getRoles();
    $scope.getDepartments();
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
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/offices?department_id=' + $scope.currentDepartmentId
    }).then(function(resp) {
      $scope.offices = resp.data;
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.createAgent = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/agents',
      data: $scope.formAgent
    }).then(function(resp) {
      $scope.showAgentForm = false;
      $scope.showAgentMembership = true;
    });
  };

  $scope.generateMembershipData = function() {

  };

  $scope.createMembership = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/memberships',
      data: $scope.generateMembershipData();
    }).then(function(resp) {
      $scope.showAgentForm = false;
      $scope.showAgentMembership = false;
    });
  };

  $scope.selectGroup = function() {
    if ($scope.formMembership.group_type === 'office') {
      $scope.showOffices = true;
    } else {
      $scope.showOffices = false;
    }
  };

  $scope.selectDepartment = function() {
    $scope.getOffices();
  };

}]);
