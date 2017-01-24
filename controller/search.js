"use strict";

const rp = require('request-promise');

function * wiki() {
    let res = rp("https://zh.wikipedia.org/wiki/");
}

function * news() {

}