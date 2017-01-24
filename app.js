'use strict';
const koa = require('koa');
const session = require('koa-session');
const err_ware = require('./middle_ware/err_handle');
var debug = require('debug');
var error = debug('app:error');
var log = debug('app:log');
log.log = console.log.bind(console);

const app = koa();
/**
 *  middle_wares
 */
app.use(err_ware);

app.host = process.env.IP || 'localhost';
app.port = process.env.PORT || '8080';

app.on('error',function (e,ctx) {
    error(e);
});

const server = app.listen(app.port,app.host,function () {
    debug.log(`KOA Server is listening on ${server.address().address}:${server.address().port}`);
});