'use strict';

var neo4j = require('neo4j-driver').v1;

var connection_url = process.env.NEO4J_SERVER;
var user = process.env.NEO4J_USER ;
var pw = process.env.PW;

var driver = neo4j.driver(connection_url, neo4j.auth.basic(user, pw));
var session = driver.session();

session
  .run( "CREATE (a:Person {name: {name}, title: {title}})", {name: "Arthur", title: "King"})
  .then( function() {
    console.log('sucess');
    return session.run( "MATCH (a:Person) WHERE a.name = {name} RETURN a.name AS name, a.title AS title",
        {name: "Arthur"})
  }, function(err) {
    console.log(err);

  })
  .then( function( result ) {
    console.log( result.records[0].get("title") + " " + result.records[0].get("name") );
    session.close();
    driver.close();
  });


module.exports = {
  create(req, res) {

  },

  show(req, res) {

  }

};
