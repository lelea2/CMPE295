'use strict';

var expect = require('expect.js');

describe('models', function () {
  it('returns the user model', function () {
    var models = require('../../server/models');
    expect(models.Users).to.be.ok();
  });

  it('returns the membership model', function () {
    var models = require('../../server/models');
    expect(models.Memberships).to.be.ok();
  });

  it('returns the roles model', function() {
    var models = require('../../server/models');
    expect(models.Roles).to.be.ok();
  });
});
