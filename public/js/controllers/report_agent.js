App.controller('reportController', ['$scope', '$http', function ($scope, $http) {

  $scope.membership = {};
  $scope.stats = [];

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
        $scope.getTaskStat();
      } else {
        alert('Current member has not assigned membership for office');
        $(document).trigger('linkedgov:loading_stop');
      }
    });
  };

  $scope.getTaskStat = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/process_stat/?office_id=' + $scope.membership.group_id
    }).then(function(resp) {
      console.log(resp.data);
      $scope.stats = resp.data;
      $scope.drawPieChart();
      $scope.drawProgressChart();
      $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.getOffice = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/offices/' + $scope.membership.group_id
    }).then(function(resp) {
      $scope.membership.Office = resp.data;
      console.log($scope.membership);
      // $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.drawPieChart = function() {
    var data = $scope.stats;
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      arr.push({
        label: "Level: " + obj.critical,
        value: obj.critical_count
      });
    }
    //Generate morris chart
    Morris.Donut({
      element: 'task-donut-chart',
      data: arr,
      colors: ["#0078d7", "#018574", "#ffb900", "#744d89", "#E74856", "#FF8C00", "#E300BC"],
      resize: true,
      redraw: true
    });
  };

  $scope.drawProgressChart = function() {
    var data = [
        { y: '1/2017', a: 4, b: 1},
        { y: '2/2017', a: 6,  b: 2},
        { y: '3/2017', a: 5,  b: 3},
        { y: '4/2017', a: 3,  b: 2},
        { y: '5/2017', a: 4,  b: 2}
      ],
      config = {
        data: data,
        element: 'task-chart',
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Total done', 'Total created'],
        fillOpacity: 0.3,
        behaveLikeLine: true,
        resize: true,
        redraw: true,
        pointFillColors:['#ffffff'],
        pointStrokeColors: ['black'],
        lineColors:["#018574", "#ffb900",]
      };
    Morris.Area(config);
  }


}]);
