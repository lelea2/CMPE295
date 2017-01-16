App.controller('accountController', ['$scope', '$http', function ($scope, $http) {

  $scope.formAccount = {};

  $scope.init = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/account/' + LINKEDGOV.getUserId()
    }).then(function(resp) {
      //success, load to view process
      $scope.formAccount = resp.data;
      $(document).trigger('linkedgov:loading_stop');
    }, function(err) {
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.updateAccount = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'PUT',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/account/' + LINKEDGOV.getUserId(),
      data: $scope.formAccount
    }).then(function(resp) {
      //success, load to view process
      window.location.reload();
    }, function(err) {
      $(document).trigger('linkedgov:loading_stop');
    });
  };

}]);
