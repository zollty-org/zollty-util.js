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
    prev.push(k)
  }
  return prev
}, [])

export default toMapKey
