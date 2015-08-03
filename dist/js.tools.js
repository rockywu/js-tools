/*
 * 自我整理常用工具类
 */
;(function() {

"use strict";

var global = this;

var Tools = {};
;(function(Tools) {
/*
 * 保护开关 Tools.switcher
 * 用于函数异步调用是，单次执行
 * 主动 开关控制
 */

var switcher = function() {
    this.local = {};
};

switcher.prototype.reset = function(key) {
    this.local[key] = false;
    return this;
};

switcher.prototype.running = function(key) {
    this.local[key] = true;
};

/*
 * 执行操作
 */
switcher.prototype.do = function(fun) {
    var key = global.btoa(unescape(encodeURIComponent(fun.toString()))),
        switcher = this.switcher(key);
    if(this.local[key] === false || this.local[key] == undefined) {
        this.running(key);
        typeof fun == 'function' && fun.call(null, switcher);
    }
};

/*
 * switcher外部接口
 */
switcher.prototype.switcher = function(key) {
    var self = this;
    return {
        switcher : self,
        key : key,
        reset : function() {
            this.switcher.reset(this.key);
        }
    }
}
/*
 * 清理开关,  避免key过多, 当页面切换时，自动清理
 */
switcher.prototype.clear = function() {
    this.local = {};
}

Tools.switcher = new switcher();

})(Tools);

/*
 * 分页函数
 */
var pagination = Tools.pagination = function(options) {
    var def = {
        page_num : 1,
        page_size : 10
    };

}

/*
 * 上一页
 */
pagination.prototype.next = function() {

}

/*
 * 下一页
 */
pagination.prototype.previous = function() {

}

this.Tools = Tools;

}).call(this);