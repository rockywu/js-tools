/*
 * 自我整理常用工具类
 */
;(function() {

"use strict";

var global = this;

var Tools = {};

this.Tools = Tools;

}).call(this);
;(function(Tools) {
    "use strict";
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
    return {
        switcher : this,
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
;(function(Tools) {
    "use strict";
/*
 * 分页函数 依赖switcher
 */
var pagination = Tools.pagination = function(options) {
    options = options || {};
    this.page = options.page > 0 ? options.page :  1;
    this.size = options.size > 0 ? options.size : 10;
    this.e = {
        self : this,
        page : this.page,
        size : this.size,
        next : function() {
            this.page++;
        },
        prev : function(){ 
            this.page <= 1 ? '' : this.page--;
        }
    };
}

/*
 * do 执行操作
 */
pagination.prototype.do = function(fun) {
    var self = this;
    Tools.switcher.do(function(switcher) {
        self.e.switcher = switcher;
        fun(self.e);
    });
}

Tools.pagination = pagination;

})(Tools);
