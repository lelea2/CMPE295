App.controller('agentsController', ['$scope', '$http', function ($scope, $http) {

  $scope.agents = [];
  $scope.formAgent = {};
  $scope.departments = [];
  $scope.offices = [];
  $scope.currentDepartment = null;
  $scope.currentOffice = null;
  $scope.showOffice = false;
  $scope.roles = [];

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
    //Get roles to display in dialog
    $scope.getRoles();
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
    $scope.agents = [];
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
    $scope.formAgent = agent || {};
    console.log($scope.formAgent);
    $scope.currentRoleId = '' + $scope.formAgent.role_id;
    // console.log($scope.formOffice);
    $('#myModal').modal({
      show: true
    });
  };

  $scope.updateAgent = function() {
    console.log($scope.currentRoleId);
    $http({
      method: 'PUT',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/memberships/' + $scope.formAgent.id, //membership update
      data: {
        role_id: parseInt($scope.currentRoleId, 10)
      }
    }).then(function(resp) {
      $scope.loadMemberships('office', $scope.currentOffice);
      //Close model
      $('#myModal').modal('hide');
    }, function(err) {
      alert('Error update role');
    });
  };

  $scope.getCurrentAgent = function(id) {
    if (!!id && $scope.agents.length > 0) {
      for (var i = 0; i < $scope.agents.length; i++) {
        if ($scope.agents[i].id === id) {
          return $scope.agents[i];
        }
      }
    }
  };

  $scope.numberToPhone = function(str) {
    console.log(str);
    return LINKEDGOV.numberToPhone(str);
  };

  $scope.getRoles = function() {
    console.log('>>> Get roles on agent page <<<<<<');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(false),
      url: '/api/roles'
    }).then(function(resp) {
      $scope.roles = resp.data;
    });
  };

}]);
