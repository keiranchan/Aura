'use strict';

const Models = require('../service/core');
const config = require('config-lite');
const moment = require('moment');
const jwt = require('jwt-simple');
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
        let expires = moment().add(7,'days').valueOf();
        let token = jwt.encode({
            iss: reqData.name,
            exp: expires
        }, config.key);

        let userInfo = yield $User.getUserByName(reqData.name);
        this.body = {
            ret:0,
            userInfo:userInfo,
            data:{
                token : token,
                expires: expires
            },
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
        let expires = moment().add(7,'days').valueOf();
        let token = jwt.encode({
            iss: reqData.name,
            exp: expires
        }, config.key);
        this.body = {
            ret:0,
            userInfo:userInfo,
            data:{
                token : token,
                expires: expires
            },
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


function * uploadFace(req, resp) {
    console.log(this.query)
    console.log(this.req.files.file)
    let r = yield $User.uploadFace(this.query.name,this.req.files.file.path);
    this.body = {
        faceUrl : this.req.files
    }
}


function * checkLogin() {
    this.body = {
        ret: 0,
        userInfo: this.query.userInfo,
        data :{
            token: this.query.token

        }
    }
}
module.exports = {
    createUser,
    loginIn,
    loginOut,
    uploadFace,
    checkLogin
};