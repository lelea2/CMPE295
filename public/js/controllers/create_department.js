App.controller('createDepartmentController', ['$scope', '$http', function ($scope, $http) {

  $scope.formDepartment = {};

  $scope.createDepartment = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments',
      data: $scope.formDepartment
    }).then(function(resp) {
      // console.log(resp.data);
      window.location = '/departments?created=true'; //create true for departments
    });
  };

  $scope.initUpload = function() {

  };

  $scope.getSignedRequest = function(file) {
    var xhr = new XMLHttpRequest();
  };

}]);
