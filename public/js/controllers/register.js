App.controller('registerController', ['$scope', '$http', function ($scope, $http) {
  $scope.formSigninData = {};
  $scope.formSignupData = {};

  $scope.signinState = true;
  $scope.errMessage = '';
  $scope.errMessageShow = false;

  $scope.processSignin = function() {
    console.log('processSignin');
    if (LINKEDGOV.isEmptyStr($scope.formSigninData.account_type)) {
      $scope.errMessage = 'Please choose a valid account type';
      $scope.errMessageShow = true;
      return;
    }
    $scope.errMessage = '';
    $scope.errMessageShow = false;
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/login',
      data: $scope.formSigninData
    }).then(function(data) {
      window.location.reload();
    }, function(err) {
      $scope.errMessage = 'Invalid credential. Please try again!';
      $scope.errMessageShow = true;
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
    $scope.errMessageShow = false;
  };

  $scope.showSignup = function() {
    $scope.signinState = false;
    $scope.errMessageShow = false;
  };
}]);
