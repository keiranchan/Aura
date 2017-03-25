'use strict';

const validator = require('validator');
const crypto = require('crypto');

module.exports = {
    "(POST|put) /api/newDetail":{
        "request": {

        }
    },
    "(POST) /api/createUser": {
        "request": {
            "body": {
                "gender": /^(male|female)$/,
                "password": /^[a-zA-Z0-9]{6,12}$/,
                "repassword": checkRepassword
            }
        },
        "response": {
            //"body.user.id": /^[a-zA-Z0-9]{32}$/
        }
    },
    "(GET|POST) /api/loginIn": {
        "request": {
            "session": checkNotLogin
        }
    },
    "POST /api/loginIn": {
        "request": {
            "body": checkSigninBody
        }
    },
    "POST /api/createTopic": {
        "request": {
            "body": checkCreateBody
        }
    },
    "POST /api/replyTopic": {
        "request": {
            "session": checkLogin,
            "body": checkReplyTopic
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

function checkNotLogin() {
    if (this.session && this.session.user) {
        return {
            ret:0,
            msg:"已登陆"
        };
    }
    return {
        ret:-1,
        msg:"未登陆"
    };
}

function checkLogin() {
    if (!this.session || !this.session.user) {
        return {
            ret:-1,
            msg:"未登陆",
            errCode:0
        };
    }
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

function checkCreateBody() {
    var body = this.request.body;
    if (!body || !body.title || body.title.length < 10) {
        return {error: '请填写合法标题!'};
    }
    else if (!body.tab) {
        return {error: '请选择版块!'};
    }
    else if (!body.content) {
        return {error: '请填写内容!'};
    }
    body.title = validator.trim(body.title);
    body.tab = validator.trim(body.tab);
    body.content = validator.trim(body.content);
    return true;
}

function checkReplyTopic() {
    var body = this.request.body;
    if (!body || !body.topic_id || !validator.isMongoId(body.topic_id)) {
        return {ret:-1,error: '回复的帖子不存在!'};
    }
    else if (!body.content) {
        return {ret:-1,error: '回复的内容为空!'};
    }
    body.content = validator.trim(body.content);
    return true;
}