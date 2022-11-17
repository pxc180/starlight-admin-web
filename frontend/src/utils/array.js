/**
 * 数组转树结构
 * @param {Array} arr 需要转树结构的数组
 * @param {Object} fieldsNames 构成树结构的相关字段配置
 *
 * @returns Array
 */
export function arrayToTree({
  arr = [],
  fieldsNames = { id: 'id', pid: 'pid', children: 'children' }
} = {}) {
  if (
    !arr ||
    Object.prototype.toString.call(arr) !== '[object Array]' ||
    !arr.length
  ) {
    return []
  }

  const result = []
  const arrMap = {}

  for (const item of arr) {
    const id = item[fieldsNames.id]
    const pid = item[fieldsNames.pid]
    const childrenFields = fieldsNames.children

    if (!arrMap[id]) {
      arrMap[id] = {}
    }

    arrMap[id] = { ...item, ...arrMap[id] }
    arrMap[id][childrenFields] = arrMap[id][childrenFields] || undefined

    const treeItem = arrMap[id]

    if (!pid) {
      result.push(treeItem)
    } else {
      if (!arrMap[pid]) {
        arrMap[pid] = {}
      }
      arrMap[pid][childrenFields] = arrMap[pid][childrenFields] || []
      arrMap[pid][childrenFields].push(treeItem)
    }
  }

  return result
}

/**
 * 树结构排序
 * @param {Array} tree 需排序的数组
 * @param {String} sortFields 排序字段
 * @param {Enum} order 排序方式 [1: 升序, -1: 降序]
 *
 * @returns Array
 */
export function treeSort({
  tree = [],
  sortFields = 'sortNo',
  childrenFields = 'children',
  order = 1
} = {}) {
  if (
    !tree ||
    Object.prototype.toString.call(tree) !== '[object Array]' ||
    !tree.length
  ) {
    return []
  }

  tree.sort((a, b) => {
    if (order === 1) {
      return a[sortFields] - b[sortFields]
    } else if (order === -1) {
      return b[sortFields] - a[sortFields]
    } else {
      return 0
    }
  })

  for (const item of tree) {
    if (item[childrenFields] && item[childrenFields].length) {
      treeSort(item.children)
    }
  }

  return tree
}
