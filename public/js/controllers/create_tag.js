App.controller('createTagController', ['$scope', '$http', function ($scope, $http) {

  $scope.formTag = {};

  $scope.createTag = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tags',
      data: $scope.formTag
    }).then(function(resp) {
      //success, load to view process
      window.location = '/tags?created=true';
    });
  };

}]);
