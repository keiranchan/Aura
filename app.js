'use strict';
const koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
var scheme = require('koa-scheme');
const err_ware = require('./middle_ware/err_handle');
const newApi = require("./routers/index");
const app = koa();
/**
 *  middle_wares
 */
app.use(err_ware);
app.use(bodyParser());
app.use(scheme(__dirname + '/middle_ware/schema', {debug: true}));

app.use(router.routes());
app.use(router.allowedMethods());
router.use("/api", newApi.routes());

/*app.use(function* () {
    if (this.path === '/signup') {
        console.log(this.request.body.password);
        this.body = {
            user: {
                id: this.request.body.password
            }
        };
    }
});*/

app.host = process.env.IP || 'localhost';
app.port = process.env.PORT || '8090';

app.on('error',function (e,ctx) {
    console.log(e);
});

const server = app.listen(app.port,app.host,function () {
    console.log(`Koa Server is listening on ${server.address().address}:${server.address().port}`);
});