/* eslint-disable */
/**
 * 获取当前页面路径，如：
 *    http://localhost:8080/xxx/meun.jsp
 *    或者 file:///D:/Java/workspaces/script/test.html
 */
const getLocation = function () {
  let ajaxLocation;
  // IE may throw an exception when accessing
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

export default getLocation;
