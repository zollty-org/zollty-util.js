/* eslint-disable */
import parseContextPath from "./parseContextPath";

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

export default getContextPath;
