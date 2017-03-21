'use strict';

const router = require("koa-router")();
const news = require("../controller/News");
const users = require("../controller/User");

router.post("/newDetail",news.getNewsDetail);
router.get("/newSummary",news.getNewsSummary);

router.post("/loginIn",users.loginIn);
router.post("/createUser",users.createUser);
router.get("/loginOut",users.loginOut);

router.get("/",function *() {
    this.body = "test ok"
});

module.exports = exports = router;