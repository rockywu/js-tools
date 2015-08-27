;(function() {
"use strict";
Array.prototype.unique = function (isStrict) {
  if (this.length < 2) {
    return [this[0]] || [];
  }
  var tempObj = {}, newArr = [];
  for (var i = 0; i < this.length; i++) {
    var v = this[i];
    var condition = isStrict ? (typeof tempObj[v] != typeof v) : false;
    if ((typeof tempObj[v] == "undefined") || condition) {
      tempObj[v] = v;
      newArr.push(v);
    }
  }
  return newArr;
}
function formatUrl(url, hasParams) {
  var rs = {};
  var ka = url.indexOf("://");
  var kb = url.indexOf('/', ka + 3);
  var kc = url.indexOf('?');
  var kd = url.indexOf('#');
  rs.href= url;
  rs.protocol = url.slice(0, ka);
  rs.origin = url.slice(0, kb);
  rs.host = url.slice(ka + 3, kb);
  rs.pathname = url.slice(kb, kc);
  rs.hash = kd > 0 ? url.slice(kd + 1) : '';
  rs.search = kd > 0 ? url.slice(kc+1, kd) : url.slice(kc+1);
  rs.params = {};
  if(hasParams === true) {
  /* 格式化 rs.search */
    var params = {};
    var tmp;
    rs.search.split("&").map(function(str) {
      tmp = str.split("[]=");
      if(tmp.length === 2) {
        if(typeof params[tmp[0]] == 'undefined') {
          params[tmp[0]] = [];
        }
        params[tmp[0]].push(tmp[1] || '');
      } else {
        tmp = str.split("=");
        params[tmp[0]] = tmp[1] || '';
      }
    });
    for(var k in params) {
      if(!params.hasOwnProperty(k)) {
        continue;
      }
      if(params[k] instanceof Array) {
        params[k] = params[k].unique();
      }
    }
    rs.params = params;
  }
  return rs;
}

function buildQuery(params) {
  var query = [];
  var k;
  for(k in params) {
    if(!(params.hasOwnProperty(k))) {
      continue;
    }
    if(params[k] instanceof Array) {
      (function(key, val, query) {
        val.map(function(str) {
          query.push(key + "[]=" + str);
        });
      })(k, params[k], query)
    } else if(typeof params[k] == 'string' || typeof params[k] == 'number') {
      query.push(k + "=" + params[k]);
    }
  }
  return query.unique().join("&");
}

function buildUrl(url, params) {
  params = typeof params == 'object' && params !== null ? params : {};
  var format = formatUrl(url, url.indexOf('?') > 0);
  for(var k in format.params) {
    if(params[k] == undefined) {
      params[k] = format.params[k];
      continue;
    }
  }
  return format.origin + format.pathname + "?" + buildQuery(params);
}
})();
