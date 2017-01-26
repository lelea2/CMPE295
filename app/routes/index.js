'use strict';

var minify = require('html-minifier').minify;

/**
 * Function minify HTML response
 * @method  minifyHTML
 */
function minifyHTML(html) {
  return minify(html, {
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
 });
}

//Display signin page
exports.signin = function(req, res, next) {
  res.render('signin', { title: 'Register', layout: 'main', controller: 'signin' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display intro page
exports.intro = function(req, res, next) {
  res.render('intro', { title: 'Register', layout: 'main', controller: 'intro' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display dashboard page
exports.dashboard = function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', layout: 'main', controller: 'dashboard' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display create_department page
exports.create_department = function(req, res, next) {
  res.render('create_department', { title: 'Configure Department', layout: 'main', controller: 'create_department' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display create_department page
exports.create_office = function(req, res, next) {
  res.render('create_office', { title: 'Configure Office', layout: 'main', controller: 'create_office' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display create_agent page
exports.create_agent = function(req, res, next) {
  res.render('create_agent', { title: 'Configure Agent', layout: 'main', controller: 'create_agent' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display create_tag page
exports.create_tag = function(req, res, next) {
  res.render('create_tag', { title: 'Configure Tag', layout: 'main', controller: 'create_tag' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display create_workflow page
exports.create_workflow = function(req, res, next) {
  res.render('create_workflow', { title: 'Configure Workflow', layout: 'main', controller: 'create_workflow' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display create_task page
exports.create_task = function(req, res, next) {
  res.render('create_task', { title: 'Configure Task', layout: 'main', controller: 'create_task' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display departments page
exports.departments = function(req, res, next) {
  res.render('departments', { title: 'Departments', layout: 'main', controller: 'departments' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display offices page
exports.offices = function(req, res, next) {
  res.render('offices', { title: 'Offices', layout: 'main', controller: 'offices' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display agents page
exports.agents = function(req, res, next) {
  res.render('agents', { title: 'Agents', layout: 'main', controller: 'agents' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display report page
exports.report = function(req, res, next) {
  res.render('report', { title: 'Report', layout: 'main', controller: 'report' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display workflows page
exports.workflows = function(req, res, next) {
  res.render('workflows', { title: 'Workflows', layout: 'main', controller: 'workflows' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display workflows case page
exports.workflow_case = function(req, res, next) {
  res.render('workflow_case', { title: 'Cases', layout: 'main', controller: 'workflow_case' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display tags page
exports.tags = function(req, res, next) {
  res.render('tags', { title: 'Tags', layout: 'main', controller: 'tags' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display tasks page
exports.tasks = function(req, res, next) {
  res.render('tasks', { title: 'Tasks', layout: 'main', controller: 'tasks' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

exports.task_case = function(req, res, next) {
  res.render('task_case', { title: 'Task Cases', layout: 'main', controller: 'task_case' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display account page
exports.account = function(req, res, next) {
  res.render('account', { title: 'Account', layout: 'main', controller: 'account' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};
