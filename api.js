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
 *      responseClass: Department
 *      nickname: showall_department
 *      consumes:
 *        - text/html
 */
exports.getDepartments = departments.showall;

/**
 * @swagger
 * path: /api/departments/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get department by Id
 *      notes: return appartment by Id
 *      responseClass: Department
 *      nickname: show_department_by_id
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: Department Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.getDepartmentById = departments.show;

/**
 * @swagger
 * path: /api/departments
 * operations:
 *   -  httpMethod: POST
 *      summary: Create department
 *      notes: Return new department created
 *      responseClass: Department
 *      nickname: create_department
 *      consumes:
 *        - text/html
 *      parameters:
 *        - dataType: Department
 *          paramType: body
 *          description: department object
 *          required: true
 */
exports.createDepartment = departments.create;

/**
 * @swagger
 * path: /api/departments/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update department
 *      notes: Return updated department
 *      responseClass: void
 *      nickname: update_department
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: Department Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: Department
 *          paramType: body
 *          description: department object
 *          required: true
 */
exports.updateDepartment = departments.update;

/**
 * @swagger
 * path: /api/departments/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete department
 *      notes: return 200 status code if succeed
 *      responseClass: void
 *      nickname: delete_department
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: Department Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.deleteDepartment = departments.delete;

/**
 * @swagger
 * path: /api/departments/{department_id}/offices
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all existing offices in system
 *      notes: Return array of offices
 *      responseClass: Office
 *      nickname: showall_office_per_department
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: department_id
 *          description: Department Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.getOffices = offices.showall;

/**
 * @swagger
 * path: /api/departments/{department_id}/offices
 * operations:
 *   -  httpMethod: POST
 *      summary: Create office
 *      notes: return office created
 *      responseClass: Office
 *      nickname: create_office
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: department_id
 *          description: Department Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: Office
 *          paramType: body
 *          description: office object
 *          required: true
 */
exports.createOffice = offices.create;

/**
 * @swagger
 * path: /api/offices/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update office
 *      notes: return office updated
 *      responseClass: Office
 *      nickname: update_office
 *      consumes:
 *        - text/html
 *          application/json
 *      parameters:
 *        - dataType: Office
 *          paramType: body
 *          description: office object
 *          required: true
 */
exports.updateOffice = offices.update;

/**
 * @swagger
 * path: /api/offices/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete office
 *      notes: delete office
 *      responseClass: void
 *      nickname: delete_office
 *      consumes:
 *        - text/html
 *          application/json
 */
exports.deleteOffice = offices.delete;

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


/**
 * @swagger
 * models:
 *   Department:
 *     id: Department
 *     properties:
 *       id:
 *         type: String
 *       name:
 *         type: String
 *         required: true
 *       description:
 *         type: String
 *         required: true
 *       address:
 *         type: String
 *         required: true
 *       phone:
 *         type: String
 *         required: true
 *       unique_code:
 *         type: String
 *         required: true
 *   Office:
 *     id: Office
 *     properties:
 *       id:
 *         type: String
 *       department_id:
 *         type: String
 *         required: true
 *       name:
 *         type: String
 *         required: true
 *       description:
 *         type: String
 *         required: true
 *       address:
 *         type: String
 *         required: true
 *       phone:
 *         type: String
 *         required: true
 *       unique_code:
 *         type: String
 *         required: true
 *   Role:
 *     id: Role
 *     properties:
 *       id:
 *         type: String
 *       role:
 *         type: String
 *         required: true
 *   User:
 *     id: User
 *     properties:
 *       id:
 *         type: String
 *       email:
 *         type: String
 *         required: true
 *       phone:
 *         type: String
 *         required: true
 *       firstName:
 *         type: String
 *       lastName:
 *         type: String
 *       password:
 *         type: String
 *         required: true
 *       isAdmin:
 *         type: Boolean
 *   Membership:
 *     id: Membership
 *     properties:
 *       id:
 *         type: String
 *       user_id:
 *         type: String
 *         required: true
 *       group_id:
 *         type: String
 *         required: true
 *       grou_type:
 *         type: String
 *         required: true
 *       permission_id:
 *         type: String
 *       isAdmin:
 *         type: Boolean
 */
