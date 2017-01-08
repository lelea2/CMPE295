App.controller('tagsController', ['$scope', '$http', function ($scope, $http) {

  $scope.tags = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tags',
    }).then(function(resp) {
      //success, load to view process
      // console.log(resp.data);
      $scope.tags = resp.data;
      LINKEDGOV.fixedTable();
    });
  };

}]);
