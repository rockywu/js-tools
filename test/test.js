function is_array(obj) {
    return obj instanceof Array;
}
function error(msg) {
    throw new Error(msg);
}
function check_source_type(name, type) {
    if(typeof name == 'string') {
        name = [name];
    }
    if(!is_array(name) || typeof type != 'string') {
        error("出现错误：check_type | parameters is error");
        return false;
    }
    for(var i= 0; i< name.length; i++) {
        test(name[i], function(o) {
            var oname = o.test.testName;
            var bool = eval("typeof " + oname + " == '"+ type +"'");
            var success = "Name : " + oname + " | Type : " + type + " is valid";
            var failed = "Name : " + oname + " | Type : " + type + " is invalid";
            ok(bool, bool ? success : failed);
        });
    }
}

/* switch 测试用例*/
check_source_type([
    "Tools.switcher.do",
    "Tools.switcher.clear",
    "Tools.switcher.running",
    "Tools.switcher.reset",
], 'function');

/* 检查pagination */
check_source_type([
    'Tools.pagination',
], 'function')

test("Tools.pagination.do", function(obj) {
    var size = 200;
    var pagination = new Tools.pagination({
        size : size
    });
    pagination.do(function(e) {
        e.prev();
        e.prev();
        e.prev();
        e.prev();
        e.prev();
        ok(e.page > 0 , "e.page : " + e.page);
        e.next();
        e.next();
        e.next();
        e.next();
        e.next();
        ok(e.page == 6, "e.page : " + e.page);
        e.prev();
        e.prev();
        e.prev();
        ok(e.page == 3, "e.page : " + e.page);
        ok(e.size === 200 , "e.size : " + e.size);
        //检查开关
        ok(typeof e.switcher.reset == 'function', "e.switcher.reset is function");
        ok(e.switcher.switcher.local[e.switcher.key], "e.switcher is open");
        e.switcher.reset();
        ok(!e.switcher.switcher.local[e.switcher.key], "e.switcher is close");
    })
})
