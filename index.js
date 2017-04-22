'use strict';

//Testing DB connection
// var models = require('./server/models/');
// models.sequelize
//   .authenticate()
//   .then(function () {
//     console.log('Connection successful');
//   })
//   .catch(function(error) {
//     console.log("Error creating connection:", error);
//   });

require('dotenv').load(); //loading .env variables to file

var express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    BPromise = require('bluebird'),
    log4js = require('log4js'),
    aws = require('aws-sdk'),
    logger = log4js.getLogger(),
    swagger = require('swagger-express'), //swagger for API view
    api = require('./api'), //API endpoint
    csrfCrypto = require('csrf-crypto'),
    uuid = require('uuid/v4'),
    expressHbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    routes = require('./app/routes'),
    security = require('./server/helpers/security'),
    departments = require('./server/controllers/department'),
    workflows = require('./server/controllers/workflow'),
    tasks = require('./server/controllers/process'),
    offices = require('./server/controllers/office'),
    // tags = require('./server/controllers/tag'),
    users = require('./server/controllers/user'),
    customers = require('./server/controllers/customer'),
    permission = require('./server/controllers/permission'),
    // roles = require('./server/controllers/role'),
    membership = require('./server/controllers/membership'),
    notifications = require('./server/controllers/notification');

require('newrelic'); //Require newrelic startup

//Initialize AWS region
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

//Configure logging
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/access.log'), 'access');

var logger = log4js.getLogger('access');

app.use(bodyParser.urlencoded({"extended": false}));
app.use(bodyParser.json());

app.use(cookieParser('cmpe295secret'));
// app.use(csrfCrypto({ key: 'cmpe295project' }));
// app.use(csrfCrypto.enforcer());

// app.use(function(req, res, next) {
//   if(res.getFormToken !== undefined) {
//     res.locals._csrf = res.getFormToken();
//   }
//   next();
// });

//Set up userId
app.use(function(req, res, next) {
  res.locals._userId = security.getUserId(req) || '';
  res.locals._role = security.getRole(req) || 'customer';
  res.locals._isAdmin = security.isAdmin(req) || '';
  res.locals._currentYear = new Date().getFullYear();
  next();
});

//Allow origin
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//Configure for swagger view
app.use(swagger.init(app, {
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  basePath: 'http://localhost:' + (process.env.PORT || '8000'),
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/',
  info: {
    title: 'LinkedGov APIs',
    description: 'LinkedGov Swagger'
  },
  apis: ['./api.js']
}));

//Using handlebar helper on both client and server side
//http://codyrushing.com/using-handlebars-helpers-on-both-client-and-server/
app.set('views', __dirname + '/app/views');
app.engine('hbs', expressHbs({
  extname:'.hbs',
  defaultLayout:'main.hbs',
  helpers: require("./public/js/handlebar-helpers/helpers.js").helpers, // same file that gets used on our client
  partialsDir: "app/views/partials/", // same as default, I just like to be explicit
  layoutsDir: "app/views/layouts/" // same as default, I just like to be explicit
}));
app.set('view engine', 'hbs');

/**** Handle static files loaded, include caching, gzip ****/
var oneWeek = 7 * 24 * 3600 * 1000; //caching time in miliseconds
// New call to compress content
app.use(compression());
app.get('*', express.static(path.join(__dirname, 'public'), { maxAge: oneWeek }));

/*****************************************************/
/***************** API Routing ***********************/
/*****************************************************/

//Department
app.get('/api/departments', api.getDepartments);
app.get('/api/departments/:id', api.getDepartmentById);
app.post('/api/departments', api.createDepartment);
app.put('/api/departments/:id', api.updateDepartment);
app.delete('/api/departments/:id', api.deleteDepartment);

//Offices
app.post('/api/departments/:department_id/offices', api.createOffice);
app.get('/api/departments/:department_id/offices', api.getOffices);
app.get('/api/offices/:id', api.getOfficeById);
app.put('/api/offices/:id', api.updateOffice);
app.delete('/api/offices/:id', api.deleteOffice);

//Memberships
app.get('/api/memberships', api.getMemberships);
app.post('/api/memberships', api.createMembership);
app.get('/api/membership_stats', membership.show_membership_stat);
app.put('/api/memberships/:id', api.updateMembership);
app.delete('/api/memberships/:id', api.deleteMembership);
app.get('/api/agent_membership', function(req, res) {
  membership.show_agent_membership(security.getUserId(req), function(resp) {
    console.log(resp);
    res.status(200).json(resp);
  }, function(err) {
    console.log(err);
    res.status(500).json({err: err});
  });
});

//Permission
app.put('/api/permission/:id', permission.update);
app.get('/api/permission/:id', permission.show); //show specific permission

//Tags
app.get('/api/tags', api.getTags);
app.post('/api/tags', api.createTag);
app.post('/api/tags/:id', api.updateTag);
app.delete('/api/tags/:id', api.deleteTag);

//StateTypes
app.get('/api/statetypes', api.getStateTypes);

//Processes
app.get('/api/process_configure', api.getProcessTypes);
app.post('/api/process_configure', api.createProcessType);
app.put('/api/process_configure/:id', api.updateProcessType);
app.delete('/api/process_configure/:id', api.deleteProcessType);

//Tasks cases
app.get('/api/tasks', api.showTasks);
app.get('/api/tasks_stats', tasks.process_per_department);
app.put('/api/task/:id', api.updateTask);

//Process note
app.get('/api/processes/:process_id/notes', api.getProcessNotes);
app.get('/api/processes/:process_id/admin', tasks.get_process_assignee); //getting process admin
app.post('/api/processes/:process_id/admin', tasks.assign_process); //assign process admin

app.post('/api/process_notes', api.createProcessNote);
app.put('/api/process_notes/:id', api.updateProcessNote);
app.delete('/api/process_notes/:id', api.deleteProcessNote);
app.get('/api/process_admin', tasks.show_task_admin);
//Getting process per office
app.get('/api/process_office', function(req, res) {
  var office_id = req.query.office_id;
  tasks.process_per_office(office_id, res);
});
//Get process statistic
app.get('/api/process_stat', function(req, res) {
  var office_id = req.query.office_id;
  tasks.process_stat_per_office(office_id, res);
});

//Workflows
app.get('/api/workflow_configure', api.getWorkflowTypes);
app.get('/api/workflow_configure/:id', api.getWorkflowTypes);
app.post('/api/workflow_configure', api.createWorkflowType);
app.put('/api/workflow_configure/:id', api.updateWorkflowType);
app.delete('/api/workflow_configure/:id', api.deleteWorkflowType);

//Workflow cases
app.get('/api/workflows', api.getWorkflowCases);
/** show workflow for customer **/
/** /api/customer_workflows/?customer_id= **/
app.get('/api/customer_workflows', workflows.show_by_customer);
app.post('/api/workflows', api.createWorkflow);
app.get('/api/workflows/:id/process', tasks.process_per_workflow);
app.get('/api/workflows/:id/files', workflows.show_files);
app.post('/api/workflows/:id/files', api.createWorkflowFile);
app.put('/api/workflows/:id', api.updateWorkflow);
app.get('/api/workflow_stats', workflows.show_workflow_stat);

//Roles
app.get('/api/roles', api.getRoles);
app.post('/api/roles', api.createRole);
app.put('/api/roles/:id', api.updateRole);

//Agent Account
app.post('/api/agents', api.createAgent);
app.put('/api/agents/:id', api.updateAgent);
app.get('/api/agents/:id', api.showAgent);

//Customer account
app.post('/api/customers', api.createCustomer);
app.put('/api/customer/:id', api.updateCustomer);
app.get('/api/customer/:id', api.showCustomer);

//Handle notifications
//notification is different between admin and agent
app.get('/api/notifications', function(req, res) {
  var role = req.query.role || 'agent';
  if (role === 'admin') { //generate notifications for admin
    notifications.show_workflow(req, res);
  } else {
    notifications.show_task(req, res);
  }
});

//Handle user login (for both customer and agent)
app.post('/api/login', function(req, res) {
  var data = req.body;
  if (data.account_type === 'agent') { //Handle agent
    users.login(req, res);
  } else if (data.account_type === 'resident') {
    customers.login(req, res);
  } else {
    res.status(403).json({err: 'Invalid account type'});
  }
});

//Handle user signup (for both customer and agent)
app.post('/api/signup', function(req, res) {
  var data = req.body;
  if (data.account_type === 'agent') { //Handle agent
    api.createAgent(req, res);
  } else if (data.account_type === 'resident') {
    api.createCustomer(req, res);
  } else {
    res.status(403).json({err: 'Invalid account type'});
  }
});

//Handle get user information (for both customer and agent)
app.get('/api/account/:id', function(req, res) {
  var data = req.headers;
  if (data.account_type === 'agent') { //Handle agent
    api.showAgent(req, res);
  } else if (data.account_type === 'resident') {
    api.showCustomer(req, res);
  } else {
    res.status(403).json({err: 'Invalid account type'});
  }
});

//Handle update user information (for both customer and agent)
app.put('/api/account/:id', function(req, res) {
  var data = req.headers;
  if (data.account_type === 'agent') { //Handle agent
    api.updateAgent(req, res);
  } else if (data.account_type === 'resident') {
    api.updateCustomer(req, res);
  } else {
    res.status(403).json({err: 'Invalid account type'});
  }
});

//Handle statistic per user
//Dashboard tiles
app.get('/api/stats', function(req, res) {
  var data = req.headers;
  if (data.account_type === 'agent' && data.admin === 'true') {
    logger.debug('Getting stats for admin.');
    BPromise.all([
      users.show_stat(req, res),
      departments.show_stat(req, res),
      workflows.show_configure_stat(req, res),
      tasks.show_configure_stat(req, res)
    ]).then(function(data) {
      res.status(200).json({
        agents_count: data[0].agents_count,
        department_count: data[1].department_count,
        workflow_configure_count: data[2].workflow_configure_count,
        tasks_configure_count: data[3].tasks_configure_count
      });
    }, function() {
      res.status(500).json({err: 'Server Error'});
    });
  } else if (data.account_type === 'agent') { //agent but not system admin
    logger.debug('Getting stats for agent.');
    membership.show_agent_membership(security.getUserId(req), function(resp) {
      //Find tasks that tied to office that user is in
      tasks.process_per_office(resp.group_id, res);
    }, function(err) {
      res.status(403).json({err: 'Invalid account type'});
    });
  } else if (data.account_type === 'resident') {
    logger.debug('Getting stats for resident.');
    res.status(500).json({err: 'Server Error'});
  } else {
    res.status(403).json({err: 'Invalid account type'});
  }
});

//Handle response for social network graph
app.get('/api/graphs', offices.showStat);

//Handle report api
app.get('/api/report', function(req,res) {

});

//Log user out
app.get('/logout', function(req, res) {
  security.logout(req);
  res.redirect(302, '/');
});

//Upload to S3 (Create and return URL);
app.get('/sign-s3', function(req, res) {
  var s3 = new aws.S3();
  var S3_BUCKET = process.env.S3_BUCKET;
  var fileName = req.query['file-name'];
  var fileType = req.query['file-type'];
  var s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, function (err, data) {
    if (err) {
      logger.error(err);
      return res.status(500).json({err: err});
    }
    // console.log(data);
    var returnData = {
      signedRequest: data,
      url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + fileName
    };
    res.status(200).json(returnData);
  });
});

//Check healthcheck (integration test for page load)
app.use('/healthcheck', require('express-healthcheck')({
  healthy: function () {
    return { everything: 'is ok' };
  }
}));

/*****************************************************/
/***************** Views Routing *********************/
/*****************************************************/
app.get('/', security.userAuthenticated(), routes.intro);
app.get('/signin', security.userAuthenticated(), routes.intro);
app.get('/dashboard', security.userRequiredLoggedIn(), routes.dashboard);
app.get('/create_department', security.userRequiredLoggedIn(), routes.create_department);
app.get('/create_office', security.userRequiredLoggedIn(), routes.create_office);
app.get('/create_agent', security.userRequiredLoggedIn(), routes.create_agent);
app.get('/create_workflow', security.userRequiredLoggedIn(), routes.create_workflow);
app.get('/create_tag', security.userRequiredLoggedIn(), routes.create_tag);
app.get('/create_task', security.userRequiredLoggedIn(), routes.create_task);
app.get('/departments', security.userRequiredLoggedIn(), routes.departments);
app.get('/offices', security.userRequiredLoggedIn(), routes.offices);
app.get('/agents', security.userRequiredLoggedIn(), routes.agents);
app.get('/report', security.userRequiredLoggedIn(), routes.report);
app.get('/workflows', security.userRequiredLoggedIn(), routes.workflows);
app.get('/workflow_case', security.userRequiredLoggedIn(), routes.workflow_case);
app.get('/tags', security.userRequiredLoggedIn(), routes.tags);
app.get('/tasks', security.userRequiredLoggedIn(), routes.tasks);
app.get('/task_case', security.userRequiredLoggedIn(), routes.task_case);
app.get('/account', security.userRequiredLoggedIn(), routes.account);
app.get('/block', routes.block);

/***************************************************************/
/******************* Run the app               *****************/
/***************************************************************/
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  // console.log(app._router.stack);
  //Comment this out if you want to see all routes
  // require('./document')(app._router.stack); //View all routes available for the app
  logger.info('Server started on port: ' +  app.get('port'));
});

module.exports = app;
