'use strict';

var mongoose = require('mongoose');
var config = require('config-lite').mongodb;

mongoose.Promise = global.Promise;

mongoose.connect(config.url, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.url, err.message);
        process.exit(1);
    }
});



exports.User = require('./User');
exports.Topic = require('./Topic');
exports.Comment = require('./Comment');