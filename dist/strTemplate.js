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

export default strTemplate
