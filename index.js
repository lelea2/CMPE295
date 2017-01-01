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
    departments = require('./server/controllers/department'),
    offices = require('./server/controllers/office'),
    tags = require('./server/controllers/tag'),
    users = require('./server/controllers/user'),
    roles = require('./server/controllers/role'),
    membership = require('./server/controllers/membership');

app.use(bodyParser.urlencoded({"extended": false}));
app.use(bodyParser.json())

app.use(cookieParser('keycatboard'));
// app.use(csrfCrypto({ key: 'cmpe281project' }));
// app.use(csrfCrypto.enforcer());

// app.use(function(req, res, next) {
//   if(res.getFormToken !== undefined) {
//     res.locals._csrf = res.getFormToken();
//   }
//   next();
// });

//Set up userId
app.use(function(req, res, next) {
  // res.locals._userId = security.getUserId(req) || '';
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
    title: 'swagger-express sample app',
    description: 'Swagger + Express = {swagger-express}'
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
app.post('/api/departments/:department_id/offices', offices.create);
app.get('/api/departments/:department_id/offices', offices.showall);
app.put('/api/offices/:id', offices.update);
app.delete('/api/offices/:id', offices.delete);

//Membership
app.get('/api/memberships', membership.show);

//Tags
app.get('/api/tags', tags.showall);
app.post('/api/tags', tags.create);
app.post('/api/tags/:id', tags.update);
app.delete('/api/tags/:id', tags.delete);

//Account
app.post('/api/accounts', users.create);
app.post('/api/login', users.login);

//Roles
app.get('/api/roles', roles.showall);
app.post('/api/roles', roles.create);
app.put('/api/roles/:id', roles.update);


/*****************************************************/
/***************** Views Routing *********************/
/*****************************************************/
app.get('/', routes.intro);
app.get('/dashboard', routes.dashboard);
app.get('/create_department', routes.create_department);
app.get('/create_office', routes.create_office);
app.get('/create_agent', routes.create_agent);
app.get('/create_workflow', routes.create_workflow);
app.get('/create_task', routes.create_task);
app.get('/departments', routes.departments);
app.get('/offices', routes.offices);
app.get('/agents', routes.agents);
app.get('/report', routes.report);
app.get('/workflows', routes.workflows);
app.get('/tasks', routes.tasks);
app.get('/account', routes.account);

/***************************************************************/
/******************* Run the app               *****************/
/***************************************************************/
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'));
});
