'use strict';

const serve = require('koa-static');
const koa = require('koa');
const router = require('koa-router')();
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const scheme = require('koa-scheme');
const err_ware = require('./middle_ware/err_handle');
const newApi = require("./routers/index");
const config = require('config-lite');
const cors = require('koa-cors');
const jwt = require('jwt-simple');
const app = koa();

app.keys = [config.key];

/**
 *  middle_wares
 */

app.use(cors());
app.use(err_ware);

app.use(bodyParser());
app.use(session({
    store: new MongoStore(config.mongodb)
}));
app.use(scheme(__dirname + '/middle_ware/schema', {debug: true}));

app.use(router.routes());
app.use(router.allowedMethods());
router.use("/api", newApi.routes());

//加载表态文件
app.use(serve(__dirname + '/upload'));

app.host = process.env.IP || 'localhost';
app.port = process.env.PORT || '8090';

app.on('error',function (e,ctx) {
    console.log(e);
});

const server = app.listen(app.port,app.host,function () {
    console.log(`Koa Server is listening on ${server.address().address}:${server.address().port}`);
});