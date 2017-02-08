App.controller('createDepartmentController', ['$scope', '$http', function ($scope, $http) {

  $scope.formDepartment = {};
  $scope.files = [];

  $scope.createDepartment = function() {
    $http({
      method: 'POST',
      headers: LINKEDGOV.getHeaders(true),
      url: '/api/departments',
      data: $scope.formDepartment
    }).then(function(resp) {
      // console.log(resp.data);
      window.location = '/departments?created=true'; //create true for departments
    });
  };

  $scope.initUpload = function() {
    console.log('initUpload');
    var files = document.getElementById('inputIcon').files;
    var file = files[0];
    //console.log(files);
    if (file == null) {
      alert('No file selected.');
    } else {
      $scope.getSignedRequest(file);
    }
  };

  $scope.uploadFile = function(file, signedRequest, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          console.log('Generate icon url: ' + url);
          $scope.formDepartment.icon_url = url;
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  };

  $scope.getSignedRequest = function(file) {
    $http({
      method: 'GET',
      url: 'sign-s3?file-name=' + file.name + '&file-type=' + file.type
    }).then(function(resp) {
      console.log(resp.data);
      var data = resp.data;
      $scope.uploadFile(file, data.signedRequest, data.url);
    }, function(err) {
      alert('Error upload file');
    });
  };

}]);
