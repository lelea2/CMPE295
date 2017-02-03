App.controller('departmentsController', ['$scope', '$http', function ($scope, $http) {

  $scope.departments = [];
  $scope.formDepartment = {};

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

  $scope.editDepartment = function(id) {
    $scope.formDepartment = $scope.getCurrentDepartment(id) || {};
    // console.log($scope.formOffice);
    $('#myModal').modal({
      show: true
    });
  };

  $scope.getCurrentDepartment = function(id) {
    if (!!id && $scope.departments.length > 0) {
      for (var i = 0; i < $scope.departments.length; i++) {
        if ($scope.departments[i].id === id) {
          return $scope.departments[i];
        }
      }
    }
  };

  $scope.updateDepartment = function(department_id) {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments/' + $scope.formDepartment.id,
      data: $scope.formDepartment
    }).then(function(resp) {
      //success, load to view process
      window.location.reoload();
    });
  };

  $scope.numberToPhone = function(str) {
    return LINKEDGOV.numberToPhone(str);
  };

}]);
