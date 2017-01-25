'use strict';

var neo4j = require('neo4j-driver').v1;


var driver = neo4j.driver(process.env.NEO4J_SERVER, neo4j.auth.basic(process.env.NEO4J_USER, process.env.PW));
var session = driver.session();
session
  .run( "CREATE (a:Person {name: {name}, title: {title}})", {name: "Arthur", title: "King"})
  .then( function() {
    return session.run( "MATCH (a:Person) WHERE a.name = {name} RETURN a.name AS name, a.title AS title",
        {name: "Arthur"})
  })
  .then( function( result ) {
    console.log( result.records[0].get("title") + " " + result.records[0].get("name") );
    session.close();
    driver.close();
  });
