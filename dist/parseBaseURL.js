/* eslint-disable */
import getLocation from "./getLocation";

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
  }
  // 获取主机地址之后的目录，如： /xxx/meun.jsp
  var pathName = window.document.location.pathname;
  // 截取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
  return ajaxLocation.substr(
    0,
    ajaxLocation.length - pathName.length + pathName.substr(1).indexOf("/") + 2
  );
};

export default parseBaseURL;
