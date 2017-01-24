'use strict';

const rp = require("request-promise");
const agent = require("superagent");
const eventproxy = require('eventproxy');
const cheerio = require('cheerio');

const WAITTIME = 5*60*100; //5分钟

const baseUrl = 'http://www.zdkjxn.com/Item/list.asp?ID=690';
var curPages = 1;
var topicUrls = [];
var items = [];

(function () {
    setTimeout(()=>{
        catchScienceList();
    },WAITTIME);
})();



module.exports = {
    items: items
};
