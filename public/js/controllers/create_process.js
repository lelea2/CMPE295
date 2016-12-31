App.controller('createProcessController', ['$scope', '$http', function ($scope, $http) {

  $scope.formProcess = {};
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

  $scope.createProcess = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_configure',
      data: $scope.formProcess
    }).then(function(resp) {
      //success, load to view process
      window.location = '/tasks?created=true';
    });
  };

}]);
