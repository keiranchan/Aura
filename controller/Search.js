'use strict'
const  service = require("../service/index");

function * search (){
    let reqData = this.request.body;
    let r = yield service.search(reqData.offset, reqData.keyword);
    this.body = {
        ret: 0,
        data: JSON.parse(r)
    }
}

module.exports = {
    search
};