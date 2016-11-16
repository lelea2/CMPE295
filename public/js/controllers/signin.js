App.controller('signinController', ['$scope', '$http', function ($scope, $http) {
  $scope.formSigninData = {};
  $scope.formSignupData = {};

  $scope.signinState = true;

  $scope.processSignin = function() {
    $http({
    }).then(function(data) {
    }, function(err) {
    });
  };

  $scope.processSignup = function() {
    $http({

    }).then(function(data) {
    }, function(err) {
    });
  };

  $scope.showSignin = function() {
    $scope.signinState = true;
  };

  $scope.showSignup = function() {
    $scope.signinState = false;
  };
}]);
