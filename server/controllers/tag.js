'use strict';

var Tag = require('../models/').Tags;
var uuid = require('uuid/v4');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid(),
      name: data.name,
      description: data.description,
      keywords: data.keywords
    };
    Tag.create(reqBody)
      .then(function (newTag) {
        res.status(201).json(newTag);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  showall(req, res) {
    Tag.findAll()
    .then(function (tags) {
      res.status(200).json(tags);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      name: data.name,
      description: data.description,
      keywords: data.keywords
    };
    Tag.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
