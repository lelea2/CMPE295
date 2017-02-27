'use strict';

var app      = require('../../index');
var BPromise = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('user creation page', function () {
  before(function () {
    require('../../server/models').sequelize.sync();
  });

  beforeEach(function () {
    this.models = require('../../server/models');
  });

  it('loads correctly', function (done) {
    request(app).get('/healthcheck').expect(200, done);
  });

});
