window.App = angular.module('workflowApp', ['ui.mask']);

App.run(['$window', '$rootScope', function($window, $rootScope) {
  $rootScope.online = navigator.onLine;
  $window.addEventListener('offline', function () {
    $rootScope.$apply(function() {
      $rootScope.online = false;
    });
  }, false);
  $window.addEventListener('online', function () {
    $rootScope.$apply(function() {
      $rootScope.online = true;
    });
  }, false);
}]);

//Disable debug mode
App.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
  // $compileProvider.commentDirectivesEnabled(false);
  // $compileProvider.cssClassDirectivesEnabled(false);
}]);

//Set up helper function
window.LINKEDGOV = window.LINKEDGOV || {};

LINKEDGOV.getHeaders = function(setCookies) {
  return {
    'Content-Type': 'application/json',
    'setCookie': setCookies || false,
    'u': $('input[name="_userId"]').val()
  }
};

LINKEDGOV.formatDate = function(date) {
  var tmp = new Date(date);
  return (tmp.getMonth() + 1) + '/' + (tmp.getDate()) + '/' + tmp.getFullYear();
};

LINKEDGOV.isEmptyStr = function(str) {
  try {
    str = $.trim(str);
    return (str === '' || str === null);
  } catch(ex) {
    return true;
  }
};
