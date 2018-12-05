var zt = (function () {
    'use strict';

    /**
     * find the value's key and return.
     * 
     * <code>
     * // suppose have data
     * const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
     * const vals = [4, 3, 2]
     * // we want to get the key set ["a", "b", "c"]
     * const keys = zt.toMapKey(vals, data);
     * </code>
     * 
     * @since 1.0.0
     * @param {array} [vals=''] The values to find.
     * @param {Map} [map=''] The data map.
     * @returns {array} Returns the values keys.
     */
    var toMapKey = function toMapKey(vals, map) {
      var keys = [];
      vals.forEach(function (element) {
        for (var p in map) {
          if (map[p] === element) {
            keys.push(p);
          }
        }
      });
      return keys;
    };

    /**
     * find the keys value and return.
     * 
     * <code>
     * // suppose have data
     * const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
     * const keys = ["a", "b", "c"]
     * // we want to get the value set [4, 3, 2]
     * const vals = zt.toMapKey(keys, data);
     * </code>
     *
     * @since 1.0.0
     * @param {array} [keys=''] The keys to find.
     * @param {Map} [map=''] The data map.
     * @returns {array} Returns the keys values.
     */
    function toMapValue(keys, map) {
      var vals = [];
      keys.forEach(function (element) {
        vals.push(map[element]);
      });
      return vals;
    }

    var isPhoneNum = function isPhoneNum(str) {
      var telreg = /^[1][3,4,5,7,8][0-9]{9}$/;

      if (!telreg.test(str)) {
        return false;
      }

      return true;
    };

    var validateMobile = function validateMobile(rule, value, callback) {
      if (value !== undefined && value !== '' && !isPhoneNum(value)) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    };

    var main = {
      toMapKey: toMapKey,
      toMapValue: toMapValue,
      isPhoneNum: isPhoneNum,
      validateMobile: validateMobile
    };

    return main;

}());
