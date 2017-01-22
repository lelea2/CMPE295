App.controller('registerController', ['$scope', '$http', function ($scope, $http) {
  $scope.formSigninData = {};
  $scope.formSignupData = {};
  $scope.formMembershipData = {};

  $scope.signinState = true;
  $scope.signupState = false;
  $scope.membershipState = false;
  $scope.errMessage = '';
  $scope.errMessageShow = false;
  $scope.errMembershipMessage = '';
  $scope.errMembershipMessageShow = false;

  $scope.roles = [];
  $scope.departments = [];
  $scope.offices = [];

  $scope.processSignin = function() {
    // console.log('processSignin');
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
    console.log('processSignin');
    if (LINKEDGOV.isEmptyStr($scope.formSignupData.account_type)) {
      $scope.errMessage = 'Please choose a valid account type';
      $scope.errMessageShow = true;
      return;
    }
    if (LINKEDGOV.isEmptyStr($scope.formSignupData.password !== $scope.formSignupData.confirm_password)) {
      $scope.errMessage = 'Password is not matching. Please try again.';
      $scope.errMessageShow = true;
      return;
    }
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/signup',
      data: $scope.formSignupData
    }).then(function(data) {
      if ($scope.formSignupData.account_type === 'agent') {
        $scope.showProcessMembership();
      } else {
        window.location = '/dashboard';
      }
    }, function(err) {
      $scope.errMessage = 'Signup failed. Please try again!';
      $scope.errMessageShow = true;
    });
  };

  $scope.processMembership = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/memberships',
      data: $scope.formMembershipData
    }).then(function(data) {
      window.location = '/dashboard';
    }, function(err) {
      $scope.errMembershipMessage = 'Register membership failed. Please try again!';
      $scope.errMembershipMessageShow = true;
    });
  };

  $scope.showProcessMembership = function() {
    $scope.membershipState = true;
    if ($scope.departments.length === 0) {
      $http({
        method: 'GET',
        headers: LINKEDGOV.getHeaders(true),
        url: '/api/departments'
      }).then(function(resp) {
        // console.log(resp.data);
        $scope.departments = resp.data;
      });
    }
    if ($scope.roles.length === 0) {
      $http({
        method: 'GET',
        headers: LINKEDGOV.getHeaders(true),
        url: '/api/roles'
      }).then(function(resp) {
        // console.log(resp.data);
        $scope.roles = resp.data;
      });
    }
  };

  $scope.showSignin = function() {
    $scope.signinState = true;
    $scope.signupState = false;
    $scope.errMessageShow = false;
  };

  $scope.showSignup = function() {
    $scope.signinState = false;
    $scope.signupState = true;
    $scope.errMessageShow = false;
  };


}]);
