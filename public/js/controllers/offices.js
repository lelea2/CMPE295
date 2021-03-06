App.controller('officesController', ['$scope', '$http', function ($scope, $http) {

  $scope.offices = [];
  $scope.departments = [];
  $scope.currentDepartment = null;
  $scope.formOffice = {};

  $scope.init = function() {
    $scope.currentDepartment = LINKEDGOV.getParamVal('department_id') || null;
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
    $scope.selectDepartment(); //view offices
  };

  $scope.selectDepartment = function() {
    // console.log($scope.currentDepartment);
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

  $scope.updateDetail = function(currentOfficeId) {
    $scope.formOffice = $scope.getCurrentOffice(currentOfficeId) || {};
    // console.log($scope.formOffice);
    $('#myModal').modal({
      show: true
    });
  };

  $scope.getCurrentOffice = function(officeId) {
    // console.log(officeId);
    // console.log('get office object');
    if (!!officeId && $scope.offices.length > 0) {
      for (var i = 0; i < $scope.offices.length; i++) {
        if ($scope.offices[i].id === officeId) {
          // console.log('return offices');
          return $scope.offices[i];
        }
      }
    }
  };

  $scope.updateOffice = function() {
    $http({
      method: 'PUT',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/offices/' + $scope.formOffice.id,
      data: $scope.formOffice
    }).then(function(resp) {
      $('#myModal').modal({
        show: false
      });
      window.location.href = '/office?department_id=' + $scope.formOffice.department_id;
    }, function(err) {
      $('#myModal').modal({
        show: false
      });
    });
  };

  $scope.numberToPhone = function(str) {
    return LINKEDGOV.numberToPhone(str);
  };

}]);
