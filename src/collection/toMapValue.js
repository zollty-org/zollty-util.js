/**
 * find the keys value and return.
 * <code>
 * // suppose have data
 * const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
 * const keys = ["a", "b", "c"]
 * // we want to get the value set [4, 3, 2]
 * const vals = zt.toMapKey(keys, data);
 * </code>
 * @since 1.0.0
 * @param {array} [keys=''] The keys to find.
 * @param {Map} [map=''] The data map.
 * @returns {array} Returns the keys values.
 */
const toMapValue = (keys, map) => Object.entries(map).reduce((prev, [k, v]) => {
  if (keys.includes(k)) {
    prev.push(v)
  }
  return prev
}, [])

export default toMapValue
