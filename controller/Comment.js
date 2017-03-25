'use strict';

var Models = require('../service/core');
var $Topic = Models.$Topic;
var $Comment = Models.$Comment;

function * getTopicDetail() {
    let reqData = this.query;
    let res = yield $Comment.getCommentsByTopicId(reqData.id);
    this.body = {
        ret:0,
        data: res
    }
}

function * replyTopic() {
    let reqData = this.request.body;
    reqData.user = this.session.user || {
            name: reqData.userInfo.name,
            email: reqData.userInfo.email
        };
    yield [
        $Comment.addComment(reqData),
        $Topic.incCommentById(reqData.topic_id)
    ];
    this.body = {
        ret: 0,
        msg: "回复成功!"
    }
}

module.exports = {
    replyTopic,
    getTopicDetail
};