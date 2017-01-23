App.controller('notificationController', ['$scope', '$http', function ($scope, $http) {

  $scope.message = '';
  $scope.type = '';
  $scope.showMessage = false;

  $scope.init = function() {
    window.setTimeout(function() {
      $scope.showMessage = false;
    }, 3000);
    $(document).bind('linkedgov:notification_shown', $scope.showNotication);
  };

  $scope.showNotication = function(e, params) {
    $scope.message = params.message;
    $scope.type = params.type || '';
    window.setTimeout(function() {
      $scope.message = '';
      $scope.showMessage = false;
    }, 3000);
  };

}]);
