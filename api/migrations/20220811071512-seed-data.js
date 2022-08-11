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
        (cb)=>(db.insert('forms', ["questions"], ["{1, 2, 3}"], cb(null, true))),
        (cb)=>(db.insert('questions', ["label", "type", "values"],
                                                   ["[Question 1....]", "radio", "{'true', 'false'}"], cb(null, true))),
        (cb)=>(db.insert('questions', ["label", "type", "values"],
                             ["[Question 2 ....]", "checkbox", "{'somewhat', 'mostly', 'a bit'}"], cb(null, true))),
        (cb)=>(db.insert('questions', ["label", "type"],
                         ["[Question 3 ....]", "text"], cb(null, true))),
        (cb)=>(db.insert('session-forms', ["session_id", "form_id"],
                         ["123", 1], cb(null, true)))
    ], callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
