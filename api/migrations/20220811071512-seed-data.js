'use strict';

var async = require('async');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
    async.series([
        (cb)=>(db.insert('form_questions', ["form_id", "question_id", "ord"], [1, 1, 1], cb(null, true))),
        (cb)=>(db.insert('form_questions', ["form_id", "question_id", "ord"], [1, 2, 2], cb(null, true))),
        (cb)=>(db.insert('form_questions', ["form_id", "question_id", "ord"], [1, 3, 3], cb(null, true))),
        (cb)=>(db.insert('questions', ["label", "type", "values"],
                                                   ["Is this a true/false question?", "radio", "['true', 'false']"], cb(null, true))),
        (cb)=>(db.insert('questions', ["label", "type", "values"],
                         ["Is this a beautiful website", "checkbox", "['Absolutely', 'Totally', 'Yes', 'Definitely']"], cb(null, true))),
        (cb)=>(db.insert('questions', ["label", "type"], ["How is your day going?", "text"], cb(null, true))),
        (cb)=>(db.insert('session_forms', ["session_id", "form_id"], ["123", 1], cb(null, true)))
    ], callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
