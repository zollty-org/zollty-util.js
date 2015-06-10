/*!
 * zollty-util.js
 * A small JavaScript utility library for NodeJS and the browser.
 * http://zollty-org.github.io/zollty-util.js/
 * Version 1.0.0 (Released on 2014-11-06)
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
    zt = function() {
        return null;
    };

    // Functions to create xhrs
    function getRequestObj() {
        return window.ActiveXObject !== undefined ? new window.ActiveXObject("Microsoft.XMLHTTP") :
        // For all other browsers, use the standard XMLHttpRequest object
        new window.XMLHttpRequest();
    }
    ;

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

        if (request.status == 404 || request.status == 2 || (request.status == 0 && request.responseText == ''))
            return null;

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

    // 缓存
    zt.baseURL;

    /**
     * 获取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
     * 
     * @see newBaseURL()
     */
    function getBaseURL() {
        if (zt.baseURL) {
            return zt.baseURL;
        }

        zt.baseURL = newBaseURL();
        return zt.baseURL;
    }

    /**
     * 获取当前页面路径，如： http://localhost:8080/xxx/meun.jsp 或者 file:///D:/Java/workspaces/script/test.html
     */
    function getLocation() {
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
    }

    /**
     * 获取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
     * 
     * @name newBaseURL
     * @return {String} 页面的根路径
     */
    function newBaseURL() {
        var ajaxLocation = getLocation();
        var pos = ajaxLocation.indexOf('?');
        if (pos != -1) {
            ajaxLocation = ajaxLocation.substring(0, pos);
        }
        // 获取主机地址之后的目录，如： /xxx/meun.jsp
        var pathName = window.document.location.pathname;
        // 截取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
        return ajaxLocation.substr(0, ajaxLocation.length - pathName.length + pathName.substr(1).indexOf('/') + 2);
    }

    /**
     * 获取当前路径上的参数值
     * 
     * @name getUrlParam
     * @param {String} 参数名称
     * @return {String} 参数的值 如果没有这个参数，则返回""，如果有多个值，则返回最后一个值
     */
    function getUrlParam(paramName) {
        var url = getLocation();
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        var j;
        for (var i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paramName.toLowerCase()];
        if (typeof (returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }

    zt.getBaseURL = getBaseURL;
    zt.getUrlParam = getUrlParam;

    // /////////zt define/////////////////////

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

    return zt;

}));