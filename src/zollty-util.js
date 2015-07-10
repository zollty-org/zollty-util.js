/*!
 * zollty-util.js
 * A small JavaScript utility library for NodeJS and the browser.
 * http://zollty-org.github.io/zollty-util.js/
 * Version 1.2.1 (Released on 2015-07-10)
 * Licensed under the MIT license. Please see LICENSE for more information.
 */
(function(){
(function(undefined){
    // (0, eval)('this') is a robust way of getting a reference to the global object
    // For details, see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
    var window = this || (0, eval)('this'),
        document = window['document'],
        navigator = window['navigator'],
        $ = window["jQuery"],
        JSON = window["JSON"];
(function(factory) {
    // Support three module loading scenarios
    if (typeof define === 'function' && define['amd']) {
        // [1] AMD anonymous module
        define(['exports', 'require'], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [2] CommonJS/Node.js
        factory(module['exports'] || exports);  // module.exports is for Node.js
    } else {
        // [3] No module loader (plain <script> tag) - put directly in global namespace
        factory(window['zt'] = {});
    }
}(function(ztExports, amdRequire){

    // Internally, all ZT objects are attached to ztExports (even the non-exported ones whose names will be minified by the closure compiler).
    var zt = typeof ztExports !== 'undefined' ? ztExports : {};

    zt.version = "1.2.1";

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

    // handle XMLHttpRequest oload
    function xhrSuccess () {
    	if (this.readyState === 4) {
    		if (this.status === 200) {
    			this.callback.apply(this, this.arguments);
    		} else {
    			console.error(this.statusText);
    		}
    	}
    }

    /**
     * 通过HTTP GET方法获取URL响应的文本内容（异步加载）
     * @name    zt.asynGetText
     * @param   {String}     URL
     * @param   {function}   fCallback
     * @param   {arguments}  ...
     */
    zt.asynGetText = function(url, fCallback /** , argumentToPass1, argumentToPass2, etc.*/) {
        if( window.ActiveXObject !== undefined ) {
            var request = new window.ActiveXObject( "Microsoft.XMLHTTP" );
            var arr = Array.prototype.slice.call(arguments, 2);
            request.onreadystatechange = function() {
                // 4代表数据发送完毕
                if ( request.readyState == 4 ) {
                    // 0为访问的本地，200代表访问服务器成功，304代表没做修改访问的是缓存
                    if(request.status == 200 || request.status == 0 || request.status == 304) {
                        fCallback.apply(request, arr);
                    }
                }
            };
            request.open("GET", url, true);
            request.send(null);
        } else { // For all other browsers, use the standard XMLHttpRequest object
            var request = new window.XMLHttpRequest();
            request.callback = fCallback;

            request.ontimeout = function() {
                console.error("The request for " + url + " timed out.");
            };

            request.arguments = Array.prototype.slice.call(arguments, 2);
            request.onload = xhrSuccess;
            request.onerror = function() {
                console.error(this.statusText);
            };

            request.open("GET", url, true);
            request.timeout = 5000;
            request.send(null);
        }
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
            var idx = returnValue.indexOf('#');
            if(idx==-1) {
                return returnValue;
            }
            return returnValue.substring(0, idx);
        }
    };


    // ~ jquery extent --------Bgn

    if($) {

    // var settings = $.extend({}, {open: false}, options);
    $.extend($.fn, {
        /**
         * 获取checkbox的值，用指定{split}分隔符连接
         * @param split 分隔符
         * @author zollty
         * @since 2014-1-15
         */
        ztCheckboxValue: function(split) {
            var chb_value = '';
            $(this).each(function(){
                if(typeof(split) == 'undefined')
                    chb_value += $(this).val() + ",";
                else
                    chb_value += $(this).val() + split;
            });
            if(chb_value.length>0){
                chb_value = chb_value.substring(0, chb_value.length-1);
            }
            return chb_value;
        },
        /**
         * 获取checkbox的值，如果为全选，则返回"ALL"字符串
         * @param total 总数，用于判断是否全选
         * @author zollty
         * @since 2014-1-15
         */
        ztCheckboxAll: function(total) {
            if( $(this).size()==total ) return 'ALL';
            var chb_value = '';
            $(this).each(function(){
                chb_value += $(this).val() + ",";
            });
            if(chb_value.length>0){
                chb_value = chb_value.substring(0, chb_value.length-1);
            }
            return chb_value;
        }
    });

    }

    // ~ jquery extent --------End

})); //end amd pre
}()); // end extern pre
})(); // end all
