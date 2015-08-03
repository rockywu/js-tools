;(function(Tools) {
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
