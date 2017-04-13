App.controller('registerController', ['$scope', '$http', function ($scope, $http) {
  $scope.formSigninData = {};
  $scope.formSignupData = {};
  $scope.formMembershipData = {};

  $scope.signinState = true;
  $scope.signupState = false;
  $scope.membershipState = false;
  $scope.currMemberData = {};
  $scope.errMessage = '';
  $scope.errMessageShow = false;
  $scope.errMembershipMessage = '';
  $scope.errMembershipMessageShow = false;

  $scope.currentDepartmentId = null;

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
    }).then(function(resp) {
      if ($scope.formSignupData.account_type === 'agent') {
        console.log(resp.data);
        $scope.currMemberData = resp.data;
        $scope.showProcessMembership();
      } else { //If choose to signup as customer, notifity customer to use mobile app
        console.log('>>>> Choose to sign up as customer <<<<<');
        window.location = '/intro';
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
    $scope.signupState = false;

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

  $scope.selectDepartment = function() {
    if (!!$scope.currentDepartmentId) {
      $(document).trigger('linkedgov:loading_start');
      $http({
        method: 'GET',
        headers: LINKEDGOV.getHeaders(false),
        url: '/api/departments/' + $scope.currentDepartmentId + '/offices'
      }).then(function(resp) {
        $scope.offices = resp.data;
        $(document).trigger('linkedgov:loading_stop');
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
