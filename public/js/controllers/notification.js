App.controller('notificationController', ['$scope', '$http', function ($scope, $http) {

  $scope.message = '';
  $scope.type = '';
  $scope.showMessage = false;
  $scope.controller = window.LINKEDGOV_CONTROLLER;

  $scope.init = function() {
    var created =  LINKEDGOV.getParamVal('created') || '';
    window.setTimeout(function() {
      $scope.showMessage = (created === 'true') ? true : false;
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
