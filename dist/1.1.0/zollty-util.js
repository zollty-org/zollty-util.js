/*!
 * zollty-util.js
 * A small JavaScript utility library for NodeJS and the browser.
 * http://zollty-org.github.io/zollty-util.js/
 * Version 1.1.0 (Released on 2015-06-09)
 * Licensed under the MIT license. Please see LICENSE for more information.
 */
(function(global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("zt requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

    // Define a local copy of zt
    zt = {};

    // Functions to create xhrs
    var getRequestObj = function() {
        return window.ActiveXObject !== undefined
        ? new window.ActiveXObject("Microsoft.XMLHTTP")
        // For all other browsers, use the standard XMLHttpRequest object
        : new window.XMLHttpRequest();
    };

    /**
     * 通过HTTP GET方法获取URL响应的文本内容
     *
     * @name zt.ajaxGetText
     * @param {String} URL
     * @return {String} 文本内容
     */
    zt.ajaxGetText = function(url) {
        var request = getRequestObj();
        request.open("GET", url, false);
        try {
            request.send(null);
        } catch (e) {
            return null;
        }
        if (request.status == 404 || request.status == 2
            || (request.status == 0 && request.responseText == '')) {

            return null;
        }

        return request.responseText;
    };

    zt.ajaxRequest = function(url, method, completeCallback) {
        method = method ? method : 'GET';
        var request = getRequestObj();
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                completeCallback(request);
            }
        };
        request.open(method, url);
        request.send(null);
    };

    // 内存缓存
    var cacheStore = zt.cacheStore = {};

    /**
     * 获取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
     *
     * @see parseBaseURL()
     */
    var getBaseURL = zt.getBaseURL = function() {
        var baseURL = cacheStore["baseURL"];
        if (baseURL && baseURL != null) {
            return baseURL;
        }
        baseURL = parseBaseURL();
        cacheStore["baseURL"] = baseURL;
        return baseURL;
    };

    /**
     * 获取服务端的上下文根路径
     *
     * @see parseContextPath()
     */
    var getContextPath = zt.getContextPath = function(lev) {
        var baseURL = cacheStore["contextPath"];
        if (baseURL && baseURL != null) {
            return baseURL;
        }
        baseURL = parseContextPath(lev);
        cacheStore["contextPath"] = baseURL;
        return baseURL;
    };

    /**
     * 获取当前页面路径，如：
     *    http://localhost:8080/xxx/meun.jsp
     *    或者 file:///D:/Java/workspaces/script/test.html
     */
    var getLocation = function() {
        var ajaxLocation;
        // IE may throw an exception when accessing
        // a field from window.location if document.domain has been set
        try {
            ajaxLocation = location.href;
        } catch (e) {
            // Use the href attribute of an A element
            // since IE will modify it given document.location
            ajaxLocation = document.createElement("a");
            ajaxLocation.href = "";
            ajaxLocation = ajaxLocation.href;
        }
        return ajaxLocation;
    };

    /**
     * 获取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
     *
     * @name parseBaseURL
     * @return {String} 页面的根路径
     */
    var parseBaseURL = function() {
        var ajaxLocation = getLocation();
        var pos = ajaxLocation.indexOf('?');
        if (pos != -1) {
            ajaxLocation = ajaxLocation.substring(0, pos);
        }
        // 获取主机地址之后的目录，如： /xxx/meun.jsp
        var pathName = window.document.location.pathname;
        // 截取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
        return ajaxLocation.substr(0,
            ajaxLocation.length - pathName.length + pathName.substr(1).indexOf('/') + 2);
    };

    /**
     * 获取页面的根路径，例如对于URL [http://localhost:8080/zollty-org/zollty-util/xxxx?id=3] <br>
     * 当lev<2时，得到 http://localhost:8080/zollty-org/ <br>
     * 当lev=2时，得到 http://localhost:8080/zollty-org/zollty-util/
     *
     * @name parseContextPath
     * @param {int}
     *            ContextPath的路径层级，例如“/zollty-org”为1级，“/zollty-org/zollty-util”为2级
     * @return {String} 页面的根路径
     */
    var parseContextPath = function(lev) {
        var ajaxLocation = getLocation();
        var pos = ajaxLocation.indexOf('?');
        if (pos != -1) {
            ajaxLocation = ajaxLocation.substring(0, pos);
        }
        // 获取主机地址之后的目录，如： /xxx/meun.jsp
        var pathName = window.document.location.pathname;
        for (var i = 1; i < lev; i++) {
            pathName = pathName.substr(pathName.substr(1).indexOf('/') + 1);
        }
        // 截取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
        return ajaxLocation.substr(0,
            ajaxLocation.length - pathName.length + pathName.substr(1).indexOf('/') + 2);
    };

    /**
     * 获取当前路径上的参数值
     *
     * @name getUrlParam
     * @param {String} 参数名称
     * @return {String} 参数的值 如果没有这个参数，则返回""，如果有多个值，则返回最后一个值
     */
    var getUrlParam = zt.getUrlParam = function(paramName) {
        var url = getLocation();
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        var j;
        for (var i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0,
                j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paramName.toLowerCase()];
        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    };

    // ~ zt define --------Begin

    if (typeof define === "function" && define.amd) {
        define("zt", [], function() {
            return zt;
        });
    }

    //Map over zt in case of overwrite
    var _zt = window.zt;

    zt.noConflict = function(deep) {
        if (deep && window.zt === zt) {
            window.zt = _zt;
        }
        return zt;
    };

    var strundefined = typeof undefined;
    if (typeof noGlobal === strundefined) {
        window.zt = zt;
    }

    // ~ zt define ----------End

    return zt;

}));
