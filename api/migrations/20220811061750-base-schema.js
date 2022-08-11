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

exports.up = function(db, cb) {
    async.series([
        db.createTable.bind(db, 'forms', {
            id: {type: 'int', primaryKey: true, autoIncrement: true},
            questions: 'int[]'
        }),
        db.createTable.bind(db, 'questions', {
            id: { type: 'int', primaryKey: true, autoIncrement: true},
            label: 'string',
            type: 'string',
            values: 'text[]'}),
        db.createTable.bind(db, 'submissions', {
            id: { type: 'int', primaryKey: true, autoIncrement: true},
            user_email: 'string',
            session_id: 'int',
            answers: 'text[]'}),
        db.createTable.bind(db, 'session_forms', {
            session_id: "int",
            form_id: 'int'})
    ], cb);
};

exports.down = function(db, cb) {
    async.series([
        db.dropTable.bind(db, 'forms'),
        db.dropTable.bind(db, 'questions'),
        db.dropTable.bind(db, 'submissions'),
        db.dropTable.bind(db, 'session-forms'),
    ], cb);
};

exports._meta = {
  "version": 1
};
