'use strict';

var subject = require('../index.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('index', function() {
  it('Should run', function(done) {
    console.log(process.env); //echo .env variable to test
    done();
  });
});
