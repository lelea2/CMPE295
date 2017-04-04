App.controller('leftRailController', ['$scope', '$http', function ($scope, $http) {

  $scope.notifications = [];

  //Get notifcations
  $scope.init = function() {
    console.log('>>>> Left rails init <<<');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/notifications/?role=' + $('input[name="_role"]').val()
    }).then(function(resp) {
      console.log(resp.data);
    });
  };

}]);
