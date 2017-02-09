App.controller('createAgentController', ['$scope', '$http', function ($scope, $http) {

  $scope.formAgent = {};
  $scope.formMembership = {};
  $scope.roles = [];
  $scope.departments = [];
  $scope.offices = [];
  $scope.currentDepartmentId = null;
  $scope.currentOfficeId = null;
  $scope.currentRoleId = null;
  $scope.currentGroupType = 'department';
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
      headers: LINKEDGOV.getHeaders(false),
      url: '/api/roles'
    }).then(function(resp) {
      $scope.roles = resp.data;
    });
  };

  $scope.getDepartments = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(false),
      url: '/api/departments'
    }).then(function(resp) {
      $scope.departments = resp.data;
    });
  };

  $scope.getOffices = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(false),
      url: '/api/departments/' + $scope.currentDepartmentId + '/offices'
    }).then(function(resp) {
      $scope.offices = resp.data;
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.createAgent = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(false), //should not set cookies
      url: '/api/agents',
      data: $scope.formAgent
    }).then(function(resp) {
      $scope.formAgent = resp.data;
      $scope.showAgentForm = false;
      $scope.showAgentMembership = true;
    });
  };

  $scope.generateMembershipData = function() {
    return {
      user_id: $scope.formAgent.id,
      group_id: ($scope.formMembership.group_type === 'department') ? $scope.currentDepartmentId : $scope.currentOfficeId,
      group_type: $scope.currentGroupType,
      role_id: $scope.currentRoleId,
    };
  };

  $scope.createMembership = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(false),
      url: '/api/memberships',
      data: $scope.generateMembershipData()
    }).then(function(resp) {
      $scope.showAgentForm = false;
      $scope.showAgentMembership = false;
      $scope.formMembership = resp.data;
      window.location = '/agents?created=true&group_type=' + $scope.formMembership.group_type + '&group_id=' + $scope.formMembership.group_id;
    });
  };

  $scope.selectGroup = function() {
    if ($scope.currentGroupType === 'office') {
      $scope.showOffices = true;
      $scope.getOffices(); //get current offices
    } else {
      $scope.showOffices = false;
    }
  };

  $scope.selectDepartment = function() {
    if ($scope.currentGroupType === 'office') {
      $scope.getOffices(); //get current offices for department
    }
  };

}]);
