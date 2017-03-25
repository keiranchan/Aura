'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: false },
    gender: { type: String, required: false },
    job: { type: String, required: false },
    age: { type: Number, required: false },
    like: { type: Number, default: 0 },
    isReal: { type: Boolean, default: false },
    isExcept: { type: Boolean, default: false },
    faceUrl:{type: String},
    signature: { type: String },   //个性签名
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

UserSchema.index({name: 1});

module.exports = mongoose.model('User', UserSchema);
