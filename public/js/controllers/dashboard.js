App.controller('dashboardController', ['$scope', '$http', function ($scope, $http) {

  $scope.stats = {};

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/stats'
    }).then(function(resp) {
      //success, load to view process
      $scope.stats = resp.data;
    });
  };

}]);
