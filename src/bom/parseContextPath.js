/* eslint-disable */
import getLocation from "./getLocation";

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
  }
  // 获取主机地址之后的目录，如： /xxx/meun.jsp
  var pathName = window.document.location.pathname;
  for (var i = 1; i < lev; i++) {
    pathName = pathName.substr(pathName.substr(1).indexOf("/") + 1);
  }
  // 截取页面的根路径，如：http://localhost:8080/xxx/ 或者 file:///D:/
  return ajaxLocation.substr(
    0,
    ajaxLocation.length - pathName.length + pathName.substr(1).indexOf("/") + 2
  );
};

export default parseContextPath;
