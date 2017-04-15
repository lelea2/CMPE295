App.controller('workflowCaseController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_cases = [];
  $scope.workflow = {};
  $scope.processShow = false;
  $scope.files = [];

  $scope.init = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows'
    }).then(function(resp) {
      //success, load to view process
      console.log(resp.data);
      $(document).trigger('linkedgov:loading_stop');
      $scope.workflow_cases = resp.data;
    });
  };

  $scope.viewProcess = function(item) {
    $(document).trigger('linkedgov:loading_start');
    var workflow_id = item.id;
    $scope.files = [];
    $scope.workflow = {};
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows/' + workflow_id + '/files'
    }).then(function(resp) {
      $scope.files = resp.data;
      console.log($scope.files);
    });
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows/' + workflow_id + '/process'
    }).then(function(resp) {
      //success, load to view process
      // console.log(resp.data);
      $(document).trigger('linkedgov:loading_stop');
      $scope.workflow = item;
      $scope.processShow = true;
      $scope.workflow.process = resp.data;
      console.log($scope.workflow);
    });
  };

  $scope.back = function() {
    $scope.processShow = false;
  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
