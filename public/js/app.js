window.App = angular.module('linkgovApp', ['ui.mask']);

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
    'u': $('input[name="_userId"]').val(),
    'account_type': $('input[name="_role"]').val(),
    'admin': ($('input[name="_isAdmin"]').val() === 'true') ? true: false
  }
};

LINKEDGOV.getUserId = function() {
  return $('input[name="_userId"]').val();
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

LINKEDGOV.phoneToNumber = function(str) {
  var num = str.replace(/[^0-9]+/g,'');
  return num;
};

LINKEDGOV.numberToPhone = function(text) {
  if (!!text) {
    return text.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '1-($1)-$2-$3');
  } else {
    return text;
  }
};

LINKEDGOV.getParamVal = function(name, url) {
  if (!url) {
    url = location.href;
  }
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return (results == null) ? '' : results[1];
}

LINKEDGOV.fixedTable = function() {
  //Adding table fixed
  var $table = $('.table');
  if ($table.length > 0) {
    var $fixedColumn = $table.clone().insertBefore($table).addClass('fixed-column');
    $fixedColumn.find('th:not(:first-child),td:not(:first-child)').remove();
    $fixedColumn.find('tr').each(function (i, elem) {
      $(this).height($table.find('tr:eq(' + i + ')').height());
    });
  }
};
