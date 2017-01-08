App.controller('notificationController', ['$scope', '$http', function ($scope, $http) {

  $scope.message = '';
  $scope.showMessage = false;

  $scope.init = function() {
    window.setTimeout(function() {
      $scope.showMessage = false;
    }, 3000);
  };

}]);
