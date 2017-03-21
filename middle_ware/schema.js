'use strict';

const validator = require('validator');
const crypto = require('crypto');

module.exports = {
    /*"/(.*)": {
        "request": {
        }
    },*/
    "(POST|put) /api/newDetail":{
        "request": {
            "url": validator.isURL
        }
    },
    "(POST|put) /api/signup": {
        "request": {
            "body": {
                "name": /^[a-zA-Z]+$/,
                "age": validator.isNumeric,
                "like": validator.isNumeric,
                "email": validator.isEmail,
                "gender": /^(male|female)$/,
                "password": /^[a-zA-Z0-9]{6,12}$/,
                "repassword": checkRepassword
            }
        },
        "response": {
            "body.user.id": /^[a-zA-Z0-9]{32}$/
        }
    },
    "POST /signin": {
        "request": {
            "body": checkSigninBody
        }
    }
};

function md5 (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

function checkRepassword(repassword) {
    var body = this.request.body;
    if (repassword !== body.password) {
        return this.throw(400, '两次密码不一致!');
    }
    body.password = md5(body.password);
    return true;
}


function checkSigninBody() {
    var body = this.request.body;
    var flash;
    if (!body || !body.name) {
        return this.throw(400, '请填写用户名!');
    }
    else if (!body.password) {
        return this.throw(400, '请填写密码!');
    }
    body.name = validator.trim(body.name);
    body.password = md5(validator.trim(body.password));
    return true;
}