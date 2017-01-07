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
    swagger = require('swagger-express'), //swagger for API view
    api = require('./api'), //API endpoint
    csrfCrypto = require('csrf-crypto'),
    expressHbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    routes = require('./app/routes'),
    security = require('./server/helpers/security'),
    // departments = require('./server/controllers/department'),
    // offices = require('./server/controllers/office'),
    // tags = require('./server/controllers/tag'),
    users = require('./server/controllers/user'),
    customers = require('./server/controllers/customer'),
    // roles = require('./server/controllers/role'),
    membership = require('./server/controllers/membership');

app.use(bodyParser.urlencoded({"extended": false}));
app.use(bodyParser.json())

app.use(cookieParser('keycatboard'));
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
  res.locals._role = security.getRole(req) || '';
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
app.delete('/api/memberships/:id', api.deleteMembership);

//Tags
app.get('/api/tags', api.getTags);
app.post('/api/tags', api.createTag);
app.post('/api/tags/:id', api.updateTag);
app.delete('/api/tags/:id', api.deleteTag);

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

//Handle user login (for both customer and agent)
app.post('/api/login', function(req, res) {
  var data = req.body;
  if (data.account_type === 'agent') { //Handle agent
    users.login(req, res);
  } else if (data.account_type === 'resident') {
    customers.login(req, res);
  } else {
    res.status(500).json({err: 'Invalid account type'});
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
    res.status(500).json({err: 'Invalid account type'});
  }
});

//Log user out
app.get('/logout', function(req, res) {
  security.logout(req);
  res.redirect(302, '/');
});

//Process note
app.get('/api/processes/:process_id/notes', api.getProcessNotes);
app.post('/api/process_notes', api.createProcessNote);
app.put('/api/process_notes/:id', api.updateProcessNote);
app.delete('/api/process_notes/:id', api.deleteProcessNote);


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
app.get('/create_task', security.userRequiredLoggedIn(), routes.create_task);
app.get('/departments', security.userRequiredLoggedIn(), routes.departments);
app.get('/offices', security.userRequiredLoggedIn(), routes.offices);
app.get('/agents', security.userRequiredLoggedIn(), routes.agents);
app.get('/report', security.userRequiredLoggedIn(), routes.report);
app.get('/workflows', security.userRequiredLoggedIn(), routes.workflows);
app.get('/tasks', security.userRequiredLoggedIn(), routes.tasks);
app.get('/account', security.userRequiredLoggedIn(), routes.account);

/***************************************************************/
/******************* Run the app               *****************/
/***************************************************************/
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'));
});
