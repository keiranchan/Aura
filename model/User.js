'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    gender: { type: String, required: true },
    job: { type: String, required: false },
    age: { type: Number, required: false },
    like: { type: Number, required: true },
    isReal: { type: Boolean, required: true },
    isExcept: { type: Boolean, required: true },
    signature: { type: String },   //个性签名
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

UserSchema.index({name: 1});

module.exports = mongoose.model('User', UserSchema);
