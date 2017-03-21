'use strict';

const rp = require("request-promise");
const service = require('../service/');

function * getNewsSummary() {
    let reqData = this.query;
    let $ = yield service.getPageNews(reqData.page);
    let _res = [];
    for(let i=0;i<$(".ae_left_top").length;i++){
        let item  = $(".ae_left_top").eq(i);
        _res.push({
            "title": item.find("ul a").text(),
            "summary": item.find("a").eq(1).text(),
            "link": item.find("a").eq(1).attr("href"),
            "date": item.find("span").text().match(/\d+\-\d+\-\d+/)[0]
        })
    }
    this.body = _res;
}

function * getNewsDetail() {
    let reqData = this.request.body;
    let $ = yield service.getSingleNews(reqData.url);
    this.body = {
        title: $(".zhtcny_top").find("span").eq(0).text(),
        article: $("#MyContent").find("span").eq(0).text().replace(/\n/gi,"<br>")
    }
}

module.exports = {
    getNewsSummary,
    getNewsDetail
};