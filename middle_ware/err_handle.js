'use strict';
let err = function *(next) {
    try {
        yield next;
    }
    catch (e) {
        this.status = e.status || 500;
        this.app.emit('error',e,this);
        this.body = {
            name: e.name,
            message: e.message,
            status: e.status,
            ret: -1
        }
    }
};

module.exports = err;