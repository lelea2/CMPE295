App.controller('workflowCaseController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_cases = [];
  $scope.workflow = {};
  $scope.processShow = false;
  $scope.files = [];
  $scope.tasks = [];
  $scope.admins = [];

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
      $scope.workflow = item;
      $scope.tasks = resp.data;
      console.log($scope.tasks);
      console.log($scope.workflow);
      //Display process overlay
      $scope.processTasks(); //process tasks
    });
  };

  //Show tasks admin
  $scope.processTasks = function() {
    var tasks = $scope.tasks;
    var arr = [];
    for(var i = 0; i < tasks.length; i++) {
      arr.push(tasks[i].id);
      $scope.tasks[i].admin = {};
    }
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_admin?filters=' + arr.join('~')
    }).then(function(resp) {
      $(document).trigger('linkedgov:loading_stop');
      var data = resp.data || [];
      // console.log($scope.admins);
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        $scope.tasks[arr.indexOf(obj.process_id)].admin = obj;
      }
      $scope.processShow = true;
      $(".middle-rail").scrollTop(0); //scroll top for middle-rails
    });
  };

  $scope.back = function() {
    $scope.processShow = false;
  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
