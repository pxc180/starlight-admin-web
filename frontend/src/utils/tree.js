/**
 * 过滤树结构
 *
 * PS：此方法会修改原数据
 * @param {Array} tree 树结构
 * @param {Function} fu 判断节点是否符合函数，传递给此函数的参数为每个节点的信息
 * @param {Boolean} deep 当节点满足条件时是否继续匹配子节点
 *
 * @returns 过滤后的树结构
 */
export function filterTree(tree = [], fn = () => true, deep = false) {
  if (!tree || !tree.length) {
    return []
  }

  const result = tree.filter((v) => {
    if (v.children && v.children.length) {
      if (deep || (!deep && !fn(v))) {
        const children = filterTree(v.children, fn, deep)
        v.children = children && children.length ? children : null
        return fn(v) || v.children
      } else {
        return false
      }
    } else {
      return fn(v)
    }
  })

  return result
}
