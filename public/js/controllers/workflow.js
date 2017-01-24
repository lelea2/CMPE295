App.controller('workflowsController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_types = [];
  $scope.tags = [];
  $scope.currentTag = '';

  $scope.init = function() {
    $scope.currentTag = LINKEDGOV.getParamVal('tag_id') || '';
    //Get all tags
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/tags'
    }).then(function(resp) {
      //success, load to view process
      $scope.tags = resp.data;
    });
    //Get all workflow configure
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: (!!$scope.currentTag) ? ('/api/workflow_configure/?tag_id=' + $scope.currentTag) : '/api/workflow_configure'
    }).then(function(resp) {
      //success, load to view process
      $scope.workflow_types = resp.data;
    });
  };

  $scope.viewProcess = function(item) {
    var flows = $scope.generateWorkflow(item.flows);
    $('#myGraphModal').modal({
      show: true
    });
  };

  $scope.generateWorkflow = function(flows) {
    console.log(flows);
    var tasks_arr = []; //array to store unique tasks
    for(var key in flows) {
      if (tasks_arr.indexOf(key) < 0) {
        tasks_arr.push(key);
      } else {
        //don't push to new tasks_arr
      }
    }

  };

  $scope.selectTag = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflow_configure?tag_id=' + $scope.currentTag,
    }).then(function(resp) {
      //success, load to view process
      $scope.workflow_types = resp.data;
      $(document).trigger('linkedgov:loading_stop');
    }, function(err) {
      $(document).trigger('linkedgov:loading_stop');
    });
  };

}]);
