'use strict';

var departments = require('./server/controllers/department'),
    offices = require('./server/controllers/office'),
    tags = require('./server/controllers/tag'),
    roles = require('./server/controllers/role'),
    users = require('./server/controllers/user'),
    customers = require('./server/controllers/customer'),
    workflows = require('./server/controllers/workflow'),
    processes = require('./server/controllers/process'),
    process_notes = require('./server/controllers/process_note'),
    permission = require('./server/controllers/permission'),
    memberships = require('./server/controllers/membership');

/**
 * @swagger
 * resourcePath: /
 * description: APIs
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
 * path: /api/offices/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get office by id
 *      notes: Return office object
 *      responseClass: Office
 *      nickname: show_office_by_id
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: Office Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.getOfficeById = offices.show;

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
 *        - name: id
 *          description: Office Id
 *          paramType: path
 *          required: true
 *          dataType: string
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
 * path: /api/agents
 * operations:
 *   -  httpMethod: POST
 *      summary: Create agent
 *      notes: return agent object created
 *      responseClass: User
 *      nickname: create_agent
 *      consumes:
 *        - text/html
 *      parameters:
 *        - dataType: User
 *          paramType: body
 *          description: customer object
 *          required: true
 */
exports.createAgent = users.create;

/**
 * @swagger
 * path: /api/agents/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update agent
 *      notes: return agent object created
 *      responseClass: User
 *      nickname: update_agent
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: User Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: User
 *          paramType: body
 *          description: user object
 *          required: true
 */
exports.updateAgent = users.update;

/**
 * @swagger
 * path: /api/agents/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Show agent
 *      notes: return agent object created
 *      responseClass: User
 *      nickname: show_agent
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: User Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.showAgent = users.show;

/**
 * @swagger
 * path: /api/memberships
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all memberships
 *      notes: return array of memberships
 *      responseClass: Membership
 *      nickname: get_memberships
 *      consumes:
 *        - text/html
 *          application/json
 *      parameters:
 *        - name: group_id
 *          description: group id
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - dataType: group_type
 *          paramType: query
 *          description: group type
 *          required: true
 */
exports.getMemberships = memberships.show;

/**
 * @swagger
 * path: /api/memberships/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete membership
 *      notes: return status code for success/failure
 *      responseClass: void
 *      nickname: delete_membership
 *      consumes:
 *        - text/html
 *          application/json
 *      parameters:
 *        - name: id
 *          description: membership id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.deleteMembership = memberships.delete;

/**
 * @swagger
 * path: /api/roles
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all roles
 *      notes: return array of roles
 *      responseClass: Role
 *      nickname: get_roles
 *      consumes:
 *        - text/html
 *          application/json
 */
exports.getRoles = roles.showall;

/**
 * @swagger
 * path: /api/roles
 * operations:
 *   -  httpMethod: POST
 *      summary: Create role
 *      notes: return role object created
 *      responseClass: Role
 *      nickname: create_role
 *      consumes:
 *        - text/html
 *      parameters:
 *        - dataType: Role
 *          paramType: body
 *          description: role object
 *          required: true
 */
exports.createRole = roles.create;

/**
 * @swagger
 * path: /api/roles/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update role
 *      notes: return role updated
 *      responseClass: Role
 *      nickname: update_role
 *      consumes:
 *        - text/html
 *          application/json
 *      parameters:
 *        - name: id
 *          description: Role Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: Role
 *          paramType: body
 *          description: role object
 *          required: true
 */
exports.updateRole = roles.update;

/**
 * @swagger
 * path: /api/customers
 * operations:
 *   -  httpMethod: POST
 *      summary: Create customer
 *      notes: return customer object created
 *      responseClass: Customer
 *      nickname: create_customer
 *      consumes:
 *        - text/html
 *      parameters:
 *        - dataType: Customer
 *          paramType: body
 *          description: customer object
 *          required: true
 */
exports.createCustomer = customers.create;

/**
 * @swagger
 * path: /api/customers/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update customer
 *      notes: return customer object created
 *      responseClass: Customer
 *      nickname: update_customer
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: Customer Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: Customer
 *          paramType: body
 *          description: customer object
 *          required: true
 */
exports.updateCustomer = customers.update;

/**
 * @swagger
 * path: /api/customers/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Show customer
 *      notes: return customer object created
 *      responseClass: Customer
 *      nickname: show_customer
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: Customer Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.showCustomer = customers.show;

/**
 * @swagger
 * path: /api/tags
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all tags available
 *      notes: return array of tags
 *      responseClass: Tag
 *      nickname: get_all_tags
 *      consumes:
 *        - text/html
 *          application/json
 */
exports.getTags = tags.showall;

/**
 * @swagger
 * path: /api/tags
 * operations:
 *   -  httpMethod: POST
 *      summary: Create new tag
 *      notes: return new tag object
 *      responseClass: Tag
 *      nickname: create_tag
 *      consumes:
 *        - text/html
 *          application/json
 *      parameters:
 *        - dataType: Tag
 *          paramType: body
 *          description: tag object
 *          required: true
 */
exports.createTag = tags.create;

/**
 * @swagger
 * path: /api/tags/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update tag
 *      notes: return updated tag object
 *      responseClass: void
 *      nickname: update_tag
 *      consumes:
 *        - text/html
 *          application/json
 *      parameters:
 *        - name: id
 *          description: Tag Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: Tag
 *          paramType: body
 *          description: tag object
 *          required: true
 */
exports.updateTag = tags.update;

/**
 * @swagger
 * path: /api/tags/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete tag
 *      notes: return status code for success/failure
 *      responseClass: void
 *      nickname: update_tag
 *      consumes:
 *        - text/html
 *          application/json
 *      parameters:
 *        - name: id
 *          description: Tag Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.deleteTag = tags.delete;

/**
 * @swagger
 * path: /api/process_configure
 * operations:
 *   -  httpMethod: GET
 *      summary: Get array of process configure
 *      notes: Return array of process configure per department
 *      responseClass: ProcessType
 *      nickname: get_process_type
 *      consumes:
 *        - text/html
 *      parameters:
 *        - dataType: department_id
 *          paramType: query
 *          description: department id
 *          required: true
 */
exports.getProcessTypes = processes.show_configure;

/**
 * @swagger
 * path: /api/process_configure
 * operations:
 *   -  httpMethod: POST
 *      summary: Create new process type
 *      notes: Return process type object
 *      responseClass: ProcessType
 *      nickname: create_process_type
 *      consumes:
 *        - text/html
 *      parameters:
 *        - dataType: ProcessType
 *          paramType: body
 *          description: process type object
 *          required: true
 */
exports.createProcessType = processes.configure;

/**
 * @swagger
 * path: /api/process_configure/:id
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update process type
 *      notes: Return process type object
 *      responseClass: ProcessType
 *      nickname: create_process_type
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: ProcessType Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: ProcessType
 *          paramType: body
 *          description: process type object
 *          required: true
 */
exports.updateProcessType = processes.update_configure;

/**
 * @swagger
 * path: /api/processes/{process_id}/notes
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all notes for a process
 *      notes: Return array of notes
 *      responseClass: ProcessNote
 *      nickname: showall_notes_per_process
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: process_id
 *          description: ProcessId Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.getProcessNotes = process_notes.showall;

/**
 * @swagger
 * path: /api/process_notes
 * operations:
 *   -  httpMethod: POST
 *      summary: Create note per process
 *      notes: Return note object
 *      responseClass: ProcessNote
 *      nickname: create_process_note
 *      consumes:
 *        - text/html
 *      parameters:
 *        - dataType: ProcessNote
 *          paramType: body
 *          description: note object
 *          required: true
 */
exports.createProcessNote = process_notes.create;

/**
 * @swagger
 * path: /api/process_notes/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update process note
 *      responseClass: void
 *      nickname: update_process_note
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: ProcessNote Id
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - dataType: ProcessNote
 *          paramType: body
 *          description: note object
 *          required: true
 */
exports.updateProcessNote = process_notes.update;

/**
 * @swagger
 * path: /api/process_notes/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete process note
 *      responseClass: void
 *      nickname: delete_process_note
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          description: ProcessNote Id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
exports.deleteProcessNote = process_notes.delete;

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
 *   Tag:
 *     id: Tag
 *     properties:
 *       id:
 *         type: String
 *       name:
 *         type: String
 *         required: true
 *       description:
 *         type: String
 *         required: true
 *       keywords:
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
 *       group_type:
 *         type: String
 *         required: true
 *       permission_id:
 *         type: String
 *       isAdmin:
 *         type: Boolean
 *   ProcessType:
 *     id: ProcessType
 *     properties:
 *       id:
 *         type: String
 *       name:
 *         type: String
 *         required: true
 *       description:
 *         type: String
 *         required: true
 *       department_id:
 *         type: String
 *         required: true
 *       type:
 *         type: String
 *         required: true
 *   ProcessNote:
 *     id: ProcessNote
 *     properties:
 *       id:
 *         type: String
 *       process_id:
 *         type: String
 *       creator_id:
 *         type: String
 *       note:
 *         type: String
 *   Customer:
 *     id: Customer
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
 *         required: true
 *       lastName:
 *         type: String
 *         required: true
 *       password:
 *         type: String
 *         required: true
 */

