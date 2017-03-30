'use strict';

const rp = require("request-promise");
const Crawler = require("crawler");
const url = require('url');
const iconv = require("iconv-lite");


const urlArray = [
    "http://www.nongyao001.com/insects/list-6087.html", //0果树虫害
    "http://www.nongyao001.com/insects/list-6088.html", //1果树病害
    "http://www.nongyao001.com/insects/list-6086.html", //2蔬菜病害
    "http://www.nongyao001.com/insects/list-6324.html" //3蔬菜虫害
]

module.exports = {
    getPageNews (count){
        let promiseArr = [];
        for(let i=count[0];i<=count[1];i++){
            promiseArr.push(getAjaxPromiseAll(i));
        }
        return Promise.all(promiseArr);
    },

    getSingleNews (url){
        return getAjaxPromiseSingle(url);
    },

    search (offset,keyword,page){
       // return rp("http://m.toutiao.com/search_content/?offset="+offset+"&count=10&from=search_tab&keyword="+encodeURI(keyword)+"&csrfmiddlewaretoken=undefined")
        let url = "http://www.nongyao001.com/insects/search.php?kw="+  iconv.encode(keyword, 'gbk').toString('binary')
        if(page){
            url+="&page="+page
        }
        return getAjaxPromiseSingle(url);
    },
    
    searchDetail (url){
        return getAjaxPromiseSingle(url);
    },

    getAllExhibits (){
            return getAjaxPromiseSingle("http://www.nongyao001.com/exhibit/");
    },

    getScienceList (obj){
        return getAjaxPromiseSingle(urlArray[obj.type])
    },

    getScienceDetail(url){
        return getAjaxPromiseSingle(url);
    }

};

function getAjaxPromiseAll(count){
    return new Promise(function(resolve, reject){
        let c = new Crawler({
            //rateLimit: 2000,
            maxConnections: 1,
            callback: function (err,res,done) {
                if(err){
                    reject($)
                } else{
                    let $ = res.$;
                    resolve($)
                }
                done();
            }
        });
        /*let urls = [];
        for(let i=0;i<count;i++){
            urls.push("http://www.zdkjxn.com/Item/list.asp?ID=690&Page="+i+1);
        }*/
        c.queue("http://www.zdkjxn.com/Item/list.asp?ID=690&Page="+count)
    });
}

function getAjaxPromiseSingle(url){
    return new Promise(function(resolve, reject){
        let c = new Crawler({
            //rateLimit: 2000,
            maxConnections: 1,
            callback: function (err,res,done) {
                if(err){
                    reject(null)
                } else{
                    let $ = res.$;
                    resolve($)
                }
                done();
            }
        });
        c.queue(url)
    });
}