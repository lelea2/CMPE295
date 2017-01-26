App.controller('createOfficeController', ['$scope', '$http', function ($scope, $http) {

  $scope.formOffice = {};
  $scope.departments = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.departments = resp.data;
    });
  };

  $scope.createOffice = function() {
    var currDepartment = $scope.formOffice.department_id;
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments/' + currDepartment + '/offices',
      data: $scope.formOffice
    }).then(function(resp) {
      // console.log(resp.data);
      window.location = '/offices?created=true&department_id=' + currDepartment; //create true for offices
    });
  };

}]);
