App.controller('tasksController', ['$scope', '$http', function ($scope, $http) {

  $scope.membership = {};
  $scope.tasks = [];
  $scope.agents = [];
  $scope.task_assignee = [];
  $scope.assignee = {};
  $scope.currentTask = {};

  $scope.init = function() {
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/agent_membership'
    }).then(function(resp) {
      //success, load to view process
      console.log(resp.data);
      $scope.membership = resp.data;
      if ($scope.membership.group_type === 'office') {
        $scope.getOffice();
        $scope.getTasksPerOffice();
      } else {
        alert('Current member has not assigned membership for office');
        $(document).trigger('linkedgov:loading_stop');
      }
    });
  };

  $scope.getOffice = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/offices/' + $scope.membership.group_id
    }).then(function(resp) {
      console.log(resp.data);
      $scope.membership.Office = resp.data;
      console.log($scope.membership);
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.getTasksPerOffice = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_office/?office_id=' + $scope.membership.group_id
    }).then(function(resp) {
      console.log(resp.data);
      $scope.tasks = resp.data;
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.getAgents = function() {
    console.log('>>>>> Get agent <<<<<');
    $(document).trigger('linkedgov:loading_start');
    $scope.agents = [];
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/memberships?group_type=office&group_id=' + $scope.membership.group_id
    }).then(function(resp) {
      //success, load to view process
      $(document).trigger('linkedgov:loading_stop');
      console.log(resp.data);
      $scope.agents = resp.data;
    });
  };

  $scope.getProcessAdmin = function(process_id) {
    console.log('>>> Get process admin <<<<');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/processes/' + process_id + '/admin'
    }).then(function(resp) {
      //success, load to view process
      $scope.task_assignee = resp.data || [];
      $scope.assignee = ($scope.task_assignee.length > 0) ? $scope.task_assignee[0].id : {};
      console.log($scope.assignee);
    });
  };

  $scope.assignProcessAdmin = function(process_id) {
    console.log('>>> assign process admin <<<<');
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/processes/' + $scope.currentTask.id + '/admin',
      data: {
        office_id: $scope.membership.Office.id,
        user_id: $scope.assignee.id
      }
    }).then(function(resp) {
      //hide modal
      $(document).bind('linkedgov:notification_shown', {
        type: 'success',
        message: 'Task assigned to new agent successfully'
      });
      $('#myTaskModal').modal('hide');
    });
  };

  $scope.currentTaskType = function(item) {
    var type = item.ProcessType.type;
    return type;
  };

  $scope.viewDetail = function(item) {
    console.log('view task detail...');
    console.log(item);
    $scope.currentTask = item;
    $scope.getAgents();
    $scope.getProcessAdmin();
    $('#myTaskModal').modal({
      show: true
    });
  };

  $scope.formatDate = function(date) {
    return LINKEDGOV.formatDate(date);
  };

}]);
