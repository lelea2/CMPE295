App.controller('reportController', ['$scope', '$http', function ($scope, $http) {

  $scope.workflow_cases = [];
  $scope.tasks = [];
  $scope.markers = [];
  $scope.map = null;
  $scope.infoWindow = null;

  var iconBase = {
    url: '../images/iconbase.png', // url
    scaledSize: new google.maps.Size(20, 20), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };

  $scope.init = function() {
    $scope.drawMap();
    $scope.drawWorkflow();
    $scope.drawProgressChart();
  };

  $scope.drawMap = function() {
    console.log('>>>> Draw map <<<<<<');
    $(document).trigger('linkedgov:loading_start');
    $scope.directionsService = new google.maps.DirectionsService;
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(37.353694, -121.952618)
        //mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.infoWindow = new google.maps.InfoWindow();

    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflows'
    }).then(function(resp) {
      //success, load to view process
      $(document).trigger('linkedgov:loading_stop');
      $scope.workflow_cases = resp.data || [];
      console.log(resp.data);
      for (var i = 0; i < $scope.workflow_cases.length; i++) {
        var data = $scope.workflow_cases[i];
        $scope.createMarker({
          longitude: data.longitude,
          latitude: data.latitude,
          description: data.WorkflowType.name,
          processed: data.processed,
          createdAt: LINKEDGOV.formatDate(data.WorkflowType.createdAt)
        });
      }
    });
  };

  $scope.createMarker = function (info) {
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.latitude, info.longitude),
      title: info.description,
      icon: iconBase
    });
    marker.content = '<div class="infoWindowContent">Created: ' + info.createdAt + '</div>';
    google.maps.event.addListener(marker, 'click', function(){
      $scope.infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      $scope.infoWindow.open($scope.map, marker);
    });
    $scope.markers.push(marker);
  };

  $scope.drawWorkflow = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/workflow_stats'
    }).then(function(resp) {
      //success, load to view process
      var data = resp.data;
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        arr.push({
          label: 'Critical-Level: ' + obj.critical,
          value: obj.criticalCount
        });
      }
      //Generate morris chart
      Morris.Donut({
        element: 'workflow-donut-chart',
        data: arr,
        colors: ["#0078d7", "#018574", "#ffb900", "#744d89", "#E74856", "#FF8C00", "#E300BC"],
        resize: true,
        redraw: true
      });
    });
  };

  $scope.drawProgressChart = function() {
    var data = [
        { y: '1/2017', a: 5, b: 4},
        { y: '2/2017', a: 6,  b: 2},
        { y: '3/2017', a: 5,  b: 5},
        { y: '4/2017', a: 7,  b: 6},
        { y: '5/2017', a: 8,  b: 6}
      ],
      config = {
        data: data,
        element: 'workflow-chart',
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Total done', 'Total created'],
        fillOpacity: 0.6,
        hideHover: 'auto',
        behaveLikeLine: true,
        resize: true,
        pointFillColors:['#ffffff'],
        pointStrokeColors: ['black'],
        lineColors:['gray','red']
      };
    Morris.Area(config);
  }

}]);
