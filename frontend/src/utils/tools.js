/**
 * 过滤对象中为空的属性
 * @param {Object} obj
 *
 * @return {Object}
 */
export function filterObj(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return {}
  }
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      (obj[key] === null || obj[key] === undefined || obj[key] === '')
    ) {
      delete obj[key]
    }
  }
  return obj
}
