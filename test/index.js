'use strict';

var subject = require('../index.js');

describe('index', function() {
  it('Should run', function(done) {
    console.log(process.env); //echo .env variable to test
    done();
  });
});
