/* eslint-disable */
import parseBaseURL from "./parseBaseURL";

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

export default getBaseURL;
