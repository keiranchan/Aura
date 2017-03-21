'use strict';

const Models = require('../service/core');
const $User = Models.$User;


function * createUser() {
    let reqData = this.request.body;
    var userExist = yield $User.getUserByName(reqData.name);
    if (userExist) {
        this.body =  {msg: '用户名已存在!',ret:-1,errCode:0};
    } else{
        let r =  yield $User.addUser(reqData);
        this.session.user = {
            name: reqData.name,
            email: reqData.email
        };
        this.body = {
            ret:0,
            msg:"注册成功"
        }
    }
}

function * loginIn() {
    let reqData = this.request.body;
    var userInfo = yield $User.getUserByName(reqData.name);
    if (!userInfo || (userInfo.password !== reqData.password)) {
        this.body = {
            ret:-1,
            msg:"用户名或密码错误"
        }
    }else{
        this.session.user = {
            name: userInfo.name,
            email: userInfo.email
        };
        this.body = {
            ret:0,
            msg:"登陆成功"
        }
    }
}

function * loginOut() {
    this.session = null;
    this.body={
        ret:0
    }
}

module.exports = {
    createUser,
    loginIn,
    loginOut
};