/**
 * Controller handle agent relationship in network
 */

'use strict';

var neo4j = require('neo4j-driver').v1;

var connection_url = process.env.NEO4J_SERVER;
var user = process.env.NEO4J_USER ;
var pw = process.env.PW;

var driver = neo4j.driver(connection_url, neo4j.auth.basic(user, pw));
var session = driver.session();

module.exports = {
  create(req, res) {
    var id = req.params.id,
        role = req.params.role;
    session
      .run( "CREATE (a:Agent {id: {id}, role: {role}})", {id: id, role: role})
      .then(function() {
        console.log('sucess');
        return session.run( "MATCH (a:Agent) WHERE a.id = {id} RETURN a.id AS id, a.role AS role",
            {id: id})
      }, function(err) {
        console.log(err);
      })
      .then(function( result ) {
        session.close();
        driver.close();
      });
  },

  show(req, res) {

  }

};
