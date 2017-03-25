'use strict'

const Models = require('../service/core');
const $Topic = Models.$Topic;

function * createTopic() {
    var data = this.request.body;
    data.user = this.session.user || {
            name: data.userInfo.name,
            email: data.userInfo.email
        };
    var topic = yield $Topic.addTopic(data);
    this.body = {
        ret: 0,
        msg: "创建话题成功"
    }
}


function * queryAllTopic() {
    var data = this.request.body;
    let res = yield $Topic.getTopicsByTab(data.tab,data.page);
    this.body = {
        ret:0,
        data: res
    }
}

function * getTopicById() {
    let reqData = this.query;
    let res = yield $Topic.getTopicById(reqData.id);
    this.body = {
        ret: 0,
        data: res
    }
}

module.exports = {
    createTopic,
    queryAllTopic,
    getTopicById
};