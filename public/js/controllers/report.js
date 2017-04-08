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

}]);
