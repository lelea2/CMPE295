'use strict';

var departments = require('./server/controllers/department'),
    offices = require('./server/controllers/office'),
    tags = require('./server/controllers/tag'),
    roles = require('./server/controllers/role'),
    users = require('./server/controllers/user'),
    customers = require('./server/controllers/customer'),
    workflows = require('./server/controllers/workflow'),
    processes = require('./server/controllers/process'),
    permission = require('./server/controllers/permission');

/**
 * @swagger
 * resourcePath: /
 * description: All about API
 */

/**
 * @swagger
 * path: /api/departments
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all existing departments in system
 *      notes: Return array of departments
 *      responseClass: Departments
 *      nickname: showall
 *      consumes:
 *        - text/html
 */
exports.getDepartments = departments.showall;

/**
 * @swagger
 * path: /api/offices
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all existing offices in system
 *      notes: Return array of offices
 *      responseClass: Offices
 *      nickname: showall
 *      consumes:
 *        - text/html
 */
exports.getOffices = offices.showall;

/**
 * @swagger
 * path: /login
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: login
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: email
 *          description: Your email
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */
exports.login = users.login;
