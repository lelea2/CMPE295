App.controller('productNotificationsController', ['$scope', '$http', function ($scope, $http) {

  $scope.notifications = [];

  $scope.getAgentRole = function() {
    var isAdmin = $('input[name="_isAdmin"]').val();
    var role = $('input[name="_role"]').val();
    if (isAdmin === 'true') {
      return 'admin';
    } else {
      return role;
    }
  };

  //Get notifcations
  $scope.init = function() {
    console.log('>>>> Left rails init <<<');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/notifications/?role=' + $scope.getAgentRole()
    }).then(function(resp) {
      console.log(resp.data);
      $scope.notifications = resp.data;
    });
  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
