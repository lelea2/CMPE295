App.controller('notificationController', ['$scope', '$http', function ($scope, $http) {

  //Message configure for successfully created message
  var SUCCESS_ARR = {
    departments: 'Department created successfully.',
    offices: 'Office created successfully.',
    tags: 'Tag created successfully.',
    workflows: 'Workflow Type configured successfully.',
    tasks: 'Tasks configured successfully.',
    agents: 'New agent added successfully.'
  };

  $scope.message = '';
  $scope.type = '';
  $scope.showMessage = false;

  $scope.init = function() {
    var created =  LINKEDGOV.getParamVal('created') || '';
    var controller = window.LINKEDGOV_CONTROLLER;
    // console.log('Notification...');
    // console.log(created);
    $scope.showMessage = (created === 'true') ? true : false;
    if (created === 'true') {
      $scope.message = SUCCESS_ARR[controller];
      $scope.type = "success";
    }
    if ($scope.showMessage === true) {
      window.setTimeout(function() {
        $scope.showMessage = false;
      }, 5000);
    }
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
