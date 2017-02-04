'use strict';

var ProcessNote = require('../models/').ProcessNotes;
var User = require('../models/').Users;
var uuid = require('uuid/v4');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid(),
      process_id: data.process_id,
      creator_id: data.creator_id,
      note: data.note
    };
    ProcessNote.create(reqBody)
      .then(function (newNote) {
        res.status(201).json(newNote);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  showall(req, res) {
    ProcessNote.findAll({
      where: {
        process_id: req.params.process_id
      },
      include: [User]
    })
    .then(function (notes) {
      res.status(200).json(notes);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      note: data.note
    };
    ProcessNote.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    ProcessNote.destroy({
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
