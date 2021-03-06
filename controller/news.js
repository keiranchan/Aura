'use strict';

const rp = require("request-promise");
const service = require('../service/');

function * getNewsSummary() {
    let reqData = this.request.body;
    let item = yield service.getPageNews(reqData.page);
    let _res = [];
    for(let $ of item){
        for(let i=0;i<$(".ae_left_top").length;i++){
            let item  = $(".ae_left_top").eq(i);
            _res.push({
                "title": item.find("ul a").text(),
                "summary": item.find("a").eq(1).text(),
                "link": item.find("a").eq(1).attr("href"),
                "date": item.find("span").text().match(/\d+\-\d+\-\d+/)[0]
            })
        }
    }
    this.body = {
        data: _res,
        ret: 0
    };
}

function * getNewsDetail() {
    let reqData = this.request.body;
    let $ = yield service.getSingleNews(reqData.url);
    this.body = {
        ret:0,
        data:{
            title: $(".zhtcny_top").find("span").eq(0).text(),
            article: $("#MyContent").html()
        }
    }
}

function * getScienceList() {
    let reqData = this.request.body;
    let $ = yield service.getScienceList(reqData);
    let _res = [];
    for(let i=0;i<$(".art_cpxli").length;i++){
        let item  = $(".art_cpxli").eq(i);
        _res.push({
            "title": item.find(".art_cpxldtl").text(),
            "link": item.find(".art_cpxldtl a").attr("href"),
            "summary": item.find(".art_cpxldtxt").text()
        })
    }

    this.body = {
        ret:0,
        data : _res
    }
}


function * getScienceDetail() {
    let reqData = this.request.body;
    let $ = yield service.getScienceDetail(reqData.url);
    this.body = {
        ret: 0,
        data: {
            title: $('.poidet_bt').text(),
            article: $('.poidet_txt').html()
        }
    }
}

module.exports = {
    getNewsSummary,
    getNewsDetail,
    getScienceList,
    getScienceDetail
};