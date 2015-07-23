"use strict";

function addParams(url,params) {

  var qi = url.indexOf("?"),
      stringified,
      base = url,
      search = {};

  if (qi >= 0) {
    base = url.slice(0,qi);
    search = parseQueryString(url.slice(qi));
  }

  if (params) {
    for (var key in params) {
      search[key] = params[key];
    }
  }

  stringified = stringifyQueryString(search);

  return base + (stringified ? "?" + stringified : "");

  function stringifyQueryString(params) {
    var pairs = [];
    for (var key in params) {

      var val = params[key];

      if (val === true) {
        val = "true";
      } else if (val === false) {
        val = "false";
      }

      pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));

    }

    return pairs.join("&");
  }

  // From https://github.com/sindresorhus/query-string
  function parseQueryString(str) {
    if (typeof str !== "string") {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, "");

    if (!str) {
      return {};
    }

    return str.split("&").reduce(function (ret, param) {
      var parts = param.replace(/\+/g, " ").split("=");
      var key = parts[0];
      var val = parts[1];

      key = decodeURIComponent(key);
      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  }

}

module.exports = addParams;