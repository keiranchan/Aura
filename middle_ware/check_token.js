'use strict'

const jwt = require('jwt-simple');
const config = require('config-lite');
const Models = require('../service/core');
const $User = Models.$User;

// 检查用户会话
module.exports = function *(next) {
    //检查post的信息或者url查询参数或者头信息
    var token = this.request.body.token || this.query.token;
    // 解析 token
    if (token) {
        // 确认token
        try {
            let decoded = jwt.decode(token, config.key);
            if (decoded.exp <= Date.now()) {
                this.throw('Access token has expired', 400);
            }

            let v = this;
            // handle token here
            let r = yield $User.getUserByName(decoded.iss);
            this.query.userInfo = r;
            this.request.body.userInfo = r;
            yield next;
        } catch (err) {
            console.log(err)
            this.throw('Access token error', 400);
        }
    } else {
        // 如果没有token，则返回错误
        this.throw('没有提供token', 403);
    }
};