var User = require('../model').User;

//新建一个用户
exports.addUser = function (data) {
    return User.create(data);
};

//通过id获取用户
exports.getUserById = function (id) {
    return User.findbyId(id).exec();
};

//通过name获取用户
exports.getUserByName = function (name) {
    return User.findOne({name: name}).exec();
};

//保存用户faceUrl
exports.uploadFace = function (name,url) {
    return User.updateOne({name: name},{$set:{"faceUrl":url}}).exec();
};
