var ztu = (function () {
  'use strict';

  /* eslint-disable */

  /**
   * 将source对象中的属性扩展到target对象上， 根据指定的isKeepTarget值决定是否保留目标对象中与
   * 源对象属性名相同的属性值。
   * @method extend
   * @param { Object } target 目标对象， 新的属性将附加到该对象上
   * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
   * @param { Boolean } isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
   * @return { Object } 返回target对象
   * @example
   * ```javascript
   *
   * var target = { name: 'target', sex: 1 },
   *      source = { name: 'source', age: 17 };
   *
   * extend( target, source, true );
   *
   * //output: { name: 'target', sex: 1, age: 17 }
   * console.log( target );
   *
   * ```
   */
  function extend(t, s, b) {
    if (s) {
      for (var k in s) {
        if (!b || !t.hasOwnProperty(k)) {
          t[k] = s[k];
        }
      }
    }

    return t;
  }

  /* eslint-disable */

  /**
   * 获取当前页面路径，如：
   *    http://localhost:8080/xxx/meun.jsp
   *    或者 file:///D:/Java/workspaces/script/test.html
   */
  const getLocation = function () {
    let ajaxLocation; // IE may throw an exception when accessing
    // a field from window.location if document.domain has been set

    try {
      ajaxLocation = window.location.href;
    } catch (e) {
      // Use the href attribute of an A element
      // since IE will modify it given document.location
      ajaxLocation = document.createElement('a');
      ajaxLocation.href = '';
      ajaxLocation = ajaxLocation.href;
    }

    return ajaxLocation;
  };

  /* eslint-disable */
  /**
   * 获取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
   *
   * @name parseBaseURL
   * @return {String} 页面的根路径
   */

  var parseBaseURL = function () {
    var ajaxLocation = getLocation();
    var pos = ajaxLocation.indexOf("?");

    if (pos != -1) {
      ajaxLocation = ajaxLocation.substring(0, pos);
    } // 获取主机地址之后的目录，如： /xxx/meun.jsp


    var pathName = window.document.location.pathname; // 截取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/

    return ajaxLocation.substr(0, ajaxLocation.length - pathName.length + pathName.substr(1).indexOf("/") + 2);
  };

  /* eslint-disable */
  /**
   * 获取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
   *
   * @see parseBaseURL()
   */

  var getBaseURL = function () {
    var baseURL = sessionStorage.getItem("baseURL");

    if (baseURL && baseURL != null) {
      return baseURL;
    }

    baseURL = parseBaseURL();
    sessionStorage.setItem("baseURL", baseURL);
    return baseURL;
  };

  /* eslint-disable */
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

  var parseContextPath = function (lev) {
    var ajaxLocation = getLocation();
    var pos = ajaxLocation.indexOf("?");

    if (pos != -1) {
      ajaxLocation = ajaxLocation.substring(0, pos);
    } // 获取主机地址之后的目录，如： /xxx/meun.jsp


    var pathName = window.document.location.pathname;

    for (var i = 1; i < lev; i++) {
      pathName = pathName.substr(pathName.substr(1).indexOf("/") + 1);
    } // 截取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/


    return ajaxLocation.substr(0, ajaxLocation.length - pathName.length + pathName.substr(1).indexOf("/") + 2);
  };

  /* eslint-disable */
  /**
   * 获取服务端的上下文根路径
   *
   * @see parseContextPath()
   */

  var getContextPath = function (lev) {
    var baseURL = sessionStorage.getItem("contextPath" + lev);

    if (baseURL && baseURL != null) {
      return baseURL;
    }

    baseURL = parseContextPath(lev);
    sessionStorage.getItem("contextPath" + lev, baseURL);
    return baseURL;
  };

  /* eslint-disable */
  /**
   * 获取当前路径上的参数值
   *
   * @name getUrlParam
   * @param {String} 参数名称
   * @return {String} 参数的值 如果没有这个参数，则返回""，如果有多个值，则返回最后一个值
   */

  var getUrlParam = function (paramName) {
    var url = getLocation();
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    var j;

    for (var i = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }

    var returnValue = paraObj[paramName.toLowerCase()];

    if (typeof returnValue == "undefined") {
      return "";
    } else {
      var idx = returnValue.indexOf("#");

      if (idx == -1) {
        return returnValue;
      }

      return returnValue.substring(0, idx);
    }
  };

  /* eslint-disable */

  /**
   * 替换模块字符串中的占位符
   * ，例如s = <span id="aaa">{{a}}</span>
   * val = {a:111}
   * 结果为：<span id="aaa">111</span>
   * 如果，
   * val = [{a:111}, {a:222}]
   * split = <br/>
   * 结果为：
   * <span id="aaa">111</span><br/><span id="aaa">222</span>
   *
   * @param {string} s 模板字符串，例如<span>{{b}}</span>
   * @param {Object|array} val 值
   * @param {string} split 数组分割字符
   */
  function strTemplate(s, val, split) {
    if (val === null || val.length === 0) {
      return;
    }

    var regex = /{{(.*?)}}/g;
    var result = regex.exec(s);
    var match = [];
    var matchReg = [];

    while (result != null) {
      // 字符串 trim
      match.push(result[1].replace(/^\s+|\s+$/gm, ''));
      matchReg.push(new RegExp('{{' + result[1] + '}}'));
      result = regex.exec(s);
    }

    if (Array.isArray(val)) {
      var ret = '';

      for (var j = 0; j < val.length; j++) {
        var s0 = s;
        var tmp = val[j];

        for (var i = 0; i < match.length; i++) {
          s0 = s0.replace(matchReg[i], tmp[match[i]]);
        }

        if (split && j != val.length - 1) {
          s0 = s0 + split;
        }

        ret = ret + s0;
      }

      return ret;
    } else {
      for (var k = 0; k < match.length; k++) {
        s = s.replace(matchReg[k], val[match[k]]);
      }

      return s;
    }
  }

  /* eslint-disable */

  function htmlTemplate(id, val, split) {
    var ele = document.getElementById(id);
    ele.innerHTML = strTemplate(ele.innerHTML, val, split);
  }

  /**
   * find the value's key and return.
   * <code>
   * // suppose have data
   * const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
   * const vals = [4, 3, 2]
   * // we want to get the key set ["a", "b", "c"]
   * const keys = zt.toMapKey(vals, data);
   * </code>
   * @since 1.0.0
   * @param {array} [vals=''] The values to find.
   * @param {Map} [map=''] The data map.
   * @returns {array} Returns the values keys.
   */
  const toMapKey = (vals, map) => Object.entries(map).reduce((prev, _ref) => {
    let [k, v] = _ref;

    // array.reduce用法参见：https://blog.csdn.net/qq_41702660/article/details/81949459
    if (vals.includes(v)) {
      prev.push(k);
    }

    return prev;
  }, []);

  /**
   * find the keys value and return.
   * <code>
   * // suppose have data
   * const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
   * const keys = ["a", "b", "c"]
   * // we want to get the value set [4, 3, 2]
   * const vals = zt.toMapKey(keys, data);
   * </code>
   * @since 1.0.0
   * @param {array} [keys=''] The keys to find.
   * @param {Map} [map=''] The data map.
   * @returns {array} Returns the keys values.
   */
  const toMapValue = (keys, map) => Object.entries(map).reduce((prev, _ref) => {
    let [k, v] = _ref;

    if (keys.includes(k)) {
      prev.push(v);
    }

    return prev;
  }, []);

  /**
   * 国际标准的银行卡号（储蓄卡和信用卡），注意：不包括各个银行的企业账户
   */
  var isBankCard = (str => {
    const reg = /^([45][0-9]{11,15}|62[0-9]{14,17})$/;
    return reg.test(str);
  });

  /**
   * 中国的身份证号码
   */
  const isIdCard = str => {
    const reg = /^([1-9]\d{5}[12][0-9]{3}[01][0-9][0-3][0-9]\d{3}[0-9X])$/;
    return reg.test(str);
  };

  /**
   * 中国三大运营商的电话号码
   */
  const isPhoneNum = str => {
    const reg = /^((86)?(13[0-9]|15[0-3,5-9]|18[0-9]|19[89]|17[0135678]|166|14[579])\d{8})$/;
    return reg.test(str);
  };

  const validateMobile = (rule, value, callback) => {
    if (value !== undefined && value !== '' && !isPhoneNum(value)) {
      callback(new Error('手机号码格式不正确'));
    } else {
      callback();
    }
  };

  var main = {
    lang: extend,
    getBaseURL,
    getContextPath,
    getLocation,
    getUrlParam,
    htmlTemplate,
    parseBaseURL,
    parseContextPath,
    toMapKey,
    toMapValue,
    strTemplate,
    isBankCard,
    isIdCard,
    isPhoneNum,
    validateMobile
  };

  return main;

}());
