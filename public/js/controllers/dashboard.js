App.controller('dashboardController', ['$scope', '$http', function ($scope, $http) {

  $scope.stats = {};
  $scope.graphs = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/stats'
    }).then(function(resp) {
      //success, load to view process
      $scope.stats = resp.data;
    });
    $scope.getNetwork();
  };

  $scope.getNetwork = function() {
    console.log('>>>> Get network <<<<<');
    $(document).trigger('linkedgov:loading_start');
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/graphs'
    }).then(function(resp) {
      //success, load to view process
      $scope.graphs = resp.data;
      console.log($scope.graphs);
      //Draw network from response
      $scope.drawNetwork();
      window.setTimeout(function() {
        $(document).trigger('linkedgov:loading_stop');
      }, 1000);
    });
  };

  $scope.drawNetwork = function() {
    var color = 'gray';
    var len = undefined;
    var departments = $scope.graphs.departments;
    var offices = $scope.graphs.offices;

    var nodes = [{id: 0, label: 'San Jose City', group: 0}];
    //Connect dots in graphs
    var edges = [];

    //Generate network based on departments
    for (var i = 0; i < departments.length; i++) {
      var department = departments[i];
      //department node
      nodes.push({
        id: department.id,
        label: department.unique_code,
        group: department.id
      });
      //linked department to city
      edges.push({
        from: department.id,
        to: 0
      });
    }

    //Generate network based on departments
    for (var i = 0; i < offices.length; i++) {
      var office = offices[i];
      var members = office.members || [];
      console.log(members);
      //office node
      nodes.push({
        id: office.id,
        label: office.unique_code,
        group: office.department_id
      });
      //link office to department
      edges.push({
        from: office.id,
        to: office.department_id
      });
      for (var j = 0; j < members.length; j++) {
        var member = members[j];
        //agent node
        nodes.push({
          id: member.id,
          label: member.Role.role,
          group: office.department_id
        });
        //link agent to office
        edges.push({
          from: member.id,
          to: office.id
        });
      }
    }

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      nodes: {
        shape: 'dot',
        size: 30,
        font: {
          size: 32,
          color: '#444'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      }
    };
    network = new vis.Network(container, data, options);
  };

}]);
