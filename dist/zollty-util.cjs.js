'use strict';

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
const toMapKey = (vals, map) => Object.entries(map).reduce((prev, [k, v]) => {
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
const toMapValue = (keys, map) => Object.entries(map).reduce((prev, [k, v]) => {
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
  htmlTemplate,
  toMapKey,
  toMapValue,
  strTemplate,
  isBankCard,
  isIdCard,
  isPhoneNum,
  validateMobile
};

module.exports = main;
