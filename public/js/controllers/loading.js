App.controller('loadingController', ['$scope', '$http', function ($scope, $http) {

  $scope.showLoading = false;

  $scope.init = function () {
    $(document).bind('linkedgov:loading_start', $scope.loadingStart);
    $(document).bind('linkedgov:loading_stop', $scope.loadingStop);
  };

  $scope.loadingStart = function() {
    $scope.showLoading = true;
  };

  $scope.loadingStop = function() {
    $scope.showLoading = false;
  };

}]);
