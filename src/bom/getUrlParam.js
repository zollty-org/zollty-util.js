/* eslint-disable */
import getLocation from "./getLocation";

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
  for (var i = 0; (j = paraString[i]); i++) {
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(
      j.indexOf("=") + 1,
      j.length
    );
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

export default getUrlParam;
