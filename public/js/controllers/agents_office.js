App.controller('agentsController', ['$scope', '$http', function ($scope, $http) {

  $scope.membership = {};
  $scope.agents = [];

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
        $scope.getAgents();
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
      // $(document).trigger('linkedgov:loading_stop');
    });
  };

  $scope.getAgents = function() {
    $(document).trigger('linkedgov:loading_start');
    $scope.agents = [];
    $http({
      method: 'GET',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/memberships?group_type=office&group_id=' + $scope.membership.group_id
    }).then(function(resp) {
      //success, load to view process
      console.log('>>>> Getting agents <<<<');
      console.log(resp.data);
      $(document).trigger('linkedgov:loading_stop');
      $scope.agents = resp.data;
      $scope.drawGraph();
    });
  };

  $scope.generateRoles = function(id, label, group) {
    return {
      id: id,
      label: label,
      group: group || id,
      shape: 'dot',
      size: 30,
      font: {
        size: 24,
        color: '#444'
      },
      borderWidth: 2
    };
  };

  $scope.drawGraph = function() {
    console.log('>>>> Draw graph <<<<');
    var office = $scope.membership.Office;
    var department = office.Department;
    var nodes = [{id: 0, label: department.unique_code, group: 0, shape: 'star'}];
    var edges = [];
    nodes.push($scope.generateRoles(office.id, office.unique_code + '\n' + office.group_email));
    nodes.push($scope.generateRoles(1, 'admin')); //admin
    nodes.push($scope.generateRoles(2, 'agent')); //agent
    nodes.push($scope.generateRoles(3, 'observer')); //observer
    edges.push({
      from: office.id,
      to: 0
    });
    edges.push({
      from: 1,
      to: office.id
    });
    edges.push({
      from: 2,
      to: office.id
    });
    edges.push({
      from: 3,
      to: office.id
    });
    edges.push({
      from: 3,
      to: 2
    });
    edges.push({
      from: 2,
      to: 1
    });
    edges.push({
      from: 1,
      to: 3
    });
    for (var i = 0; i < $scope.agents.length; i++) {
      var obj = $scope.agents[i];
      nodes.push($scope.generateRoles(obj.id, obj.User.email, obj.Role.id));
      edges.push({
        from: obj.id,
        to: obj.Role.id
      });
    }

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      edges: {
        width: 2
      }
    };
    network = new vis.Network(container, data, options);
    //Handle node click
    network.on('click', function(properties) {
      console.log('clicked node ' + properties.nodes);
    });
  };

}]);
