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
