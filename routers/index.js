'use strict';

const router = require("koa-router")();
const path = require('path');
const koaBody = require('koa-body')();
var multer = require('koa-multer');
const bodyParser = require('koa-bodyparser');
const news = require("../controller/News");
const users = require("../controller/User");
const topic = require("../controller/Topics");
const comment = require("../controller/Comment");
const search = require("../controller/Search");
const jwtauth = require('../middle_ware/check_token');


var upload = multer({dest: 'upload'})


router.post("/newDetail",bodyParser(),news.getNewsDetail);
router.post("/newSummary",bodyParser(),news.getNewsSummary);

router.post("/loginIn",bodyParser(),users.loginIn);
router.get("/loginIn",jwtauth,users.checkLogin);
router.post("/createUser",bodyParser(),users.createUser);
router.get("/loginOut",users.loginOut);
router.post("/uploadFace",upload,users.uploadFace);

router.post("/createTopic",jwtauth,topic.createTopic);
router.post("/queryAllTopic",bodyParser(),topic.queryAllTopic);
router.get("/getTopicById",topic.getTopicById);


router.post("/replyTopic",jwtauth,comment.replyTopic);
router.get("/getTopicDetail",comment.getTopicDetail);

router.post("/search",bodyParser(),search.search);


router.get("/",function *() {
    this.body = "test ok"
});

module.exports = exports = router;