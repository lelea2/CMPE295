App.controller('agentsController', ['$scope', '$http', function ($scope, $http) {

  $scope.agents = [];
  $scope.formAgent = {};
  $scope.departments = [];
  $scope.offices = [];
  $scope.currentDepartment = null;
  $scope.currentOffice = null;
  $scope.showOffice = false;
  $scope.membership_stats = [];
  $scope.roles = [];
  $scope.permission = {
    manage_member: false,
    manage_write: false,
    manage_read: false,
    manage_delete: false
  };

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
    $scope.loadMembershipStats();
  };

  $scope.loadMembershipStats = function() {
    console.log('>>>> Loading memberships <<<<');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/membership_stats'
    }).then(function(resp) {
      //success, load to view process
      console.log(resp.data);
      $(document).trigger('linkedgov:loading_stop');
      $scope.membership_stats = resp.data;
      $scope.drawPieChart();
    });
  };

  $scope.drawPieChart = function() {
    var data = $scope.membership_stats;
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      arr.push({
        label: obj.Role.role,
        value: obj.roles_count
      });
    }
    //Generate morris chart
    Morris.Donut({
      element: 'agents-donut',
      data: arr,
      backgroundColor: '#ccc',
      labelColor: '#4A5549',
      colors: ["#0078d7", "#018574", "#ffb900"],
      resize: true,
      redraw: true
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

  //Load office don't need affect for now
  $scope.loadOffices = function() {
    if (!!$scope.currentDepartment) {
      // $(document).trigger('linkedgov:loading_start');
      $http({
        method: 'GET',
        headers: LINKEDGOV.getHeaders(true),
        url: '/api/departments/' + $scope.currentDepartment + '/offices'
      }).then(function(resp) {
        // $(document).trigger('linkedgov:loading_stop');
        $scope.offices = resp.data;
      }, function(err) {
        $scope.offices = [];
        // $(document).trigger('linkedgov:loading_stop');
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
    $scope.permission = $scope.formAgent.Permission;
    // console.log($scope.permission);
    // console.log($scope.formOffice);
    $('#myModal').modal({
      show: true
    });
  };

  $scope.editPermission = function() {
    console.log($scope.permission);
    $http({
      method: 'PUT',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/permission/' + $scope.permission.id, //membership update
      data: $scope.permission
    }).then(function(resp) {
      $scope.loadMemberships('office', $scope.currentOffice);
      $(document).trigger('linkedgov:notification_shown', {
        message: 'Update Agent permission successfully',
        type: 'success'
      });
      //Close model
      $('#myModal').modal('hide');
    }, function(err) {
      alert('Error update role');
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
      $(document).trigger('linkedgov:notification_shown', {
        message: 'Update Agent role successfully',
        type: 'success'
      });
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
    // console.log(str);
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
