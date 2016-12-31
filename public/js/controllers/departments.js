App.controller('departmentsController', ['$scope', '$http', function ($scope, $http) {

  $scope.departments = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments',
    }).then(function(resp) {
      //success, load to view process
      $scope.departments = resp.data;
    });
  };

}]);
