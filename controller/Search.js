'use strict'
const  service = require("../service/index");

function * search (){
    let reqData = this.request.body;
    let $ = yield service.search(0,reqData.keyword,reqData.page);
    let _res = [];
    for(let i=0;i<$(".new_li").length;i++){
        let item  = $(".new_li").eq(i);
        _res.push({
            "imgSrc": item.find(".new_lib img").attr("src"),
            "title": item.find(".new_lib h4 a").text(),
            "summary": item.find(".new_lib_text").text(),
            "link": item.find(".new_lib h4 a").attr("href"),
            "date": item.find("new_lib_text1").text()
        })
    }
    this.body = {
        data: _res,
        ret: 0
    };
}

function * searchDetail() {
    let reqData = this.request.body;
    let $ = yield service.searchDetail(reqData.url);
    this.body = {
        ret:0,
        data:{
            article: $(".poidet_txt").html(),
            title: $(".poidet_bt").text()
        }
    }
}

function * getAllExhibits() {
    let $ = yield service.getAllExhibits();
    let html = $(".tj_show ul li");
    let r = [];
    for(let i=0;i<html.length;i++){
        let o = html.eq(i);
        if(o.find("h3 a").text()){
            r.push({
                title: o.find("h3 a").text(),
                date: o.find(".jj span").text(),
                area: o.find(".dr span").eq(0).text(),
                state: o.find(".show_btn").text()
            })
        }
    }
    this.body = {
        ret:0,
        data: r
    }
}

module.exports = {
    search,
    searchDetail,
    getAllExhibits
};