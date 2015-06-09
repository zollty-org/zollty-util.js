/*!zollty-util.js 1.0.0 - http://zollty-org.github.io/zollty-util.js/*/
!function(t,e){"object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){if(!t.document)throw Error("zt requires a window with a document")
return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(t,e){function n(){return void 0!==t.ActiveXObject?new t.ActiveXObject("Microsoft.XMLHTTP"):new t.XMLHttpRequest}function r(){return a.baseURL?a.baseURL:(a.baseURL=u(),a.baseURL)}function o(){var t
try{t=location.href}catch(e){t=document.createElement("a"),t.href="",t=t.href}return t}function u(){var e=o(),n=e.indexOf("?");-1!=n&&(e=e.substring(0,n))
var r=t.document.location.pathname
return e.substr(0,e.length-r.length+r.substr(1).indexOf("/")+2)}function i(t){for(var e,n=o(),r=n.substring(n.indexOf("?")+1,n.length).split("&"),u={},i=0;e=r[i];i++)u[e.substring(0,e.indexOf("=")).toLowerCase()]=e.substring(e.indexOf("=")+1,e.length)
var a=u[t.toLowerCase()]
return void 0===a?"":a}var a=function(){return null}
a.ajaxGetText=function(t){var e=n()
e.open("GET",t,!1)
try{e.send(null)}catch(r){return null}return 404==e.status||2==e.status||0==e.status&&""==e.responseText?null:e.responseText},a.ajaxRequest=function(t,e,r){e=e?e:"GET"
var o=n()
o.onreadystatechange=function(){4==o.readyState&&r(o)},o.open(e,t),o.send(null)},a.baseURL,a.getBaseURL=r,a.getUrlParam=i,"function"==typeof define&&define.amd&&define("zt",[],function(){return a})
var s=t.zt
a.noConflict=function(e){return e&&t.zt===a&&(t.zt=s),a}
var f="undefined"
return typeof e===f&&(t.zt=a),a})