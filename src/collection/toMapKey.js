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
const toMapKey = (vals, map) => {
    const keys = []
    vals.forEach(element => {
        for (var p in map) {
            if (map[p] === element) {
                keys.push(p)
            }
        }
    })
    return keys
}

export default toMapKey