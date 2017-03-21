'use strict';

const rp = require("request-promise");
const Crawler = require("crawler");
const url = require('url');

module.exports = {
    getPageNews (count){
      return getAjaxPromiseAll(count);
    },

    getSingleNews (url){
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
                    console.log(err)
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