App.controller('workflowCaseController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_cases = [];
  $scope.processShow = false;

  $scope.init = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows'
    }).then(function(resp) {
      //success, load to view process
      console.log(resp.data);
      $(document).trigger('linkedgov:loading_end');
      $scope.workflow_cases = resp.data;
    });
  };

  $scope.viewProcess = function(item) {
    $(document).trigger('linkedgov:loading_start');
    var workflow_id = item.id;
    $scope.processShow = true;
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows/' + workflow_id + '/process'
    }).then(function(resp) {
      //success, load to view process
      $(document).trigger('linkedgov:loading_end');
      console.log(resp.data);
    });
  };

  $scope.back = function() {
    $scope.processShow = false;
  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
