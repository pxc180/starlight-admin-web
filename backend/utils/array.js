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
    return [];
  }

  const result = [];
  const arrMap = {};

  for (const item of arr) {
    const id = item[fieldsNames.id].toString();
    const pid = item[fieldsNames.pid];
    const childrenFields = fieldsNames.children;

    if (!arrMap[id]) {
      arrMap[id] = {};
    }

    arrMap[id] = { ...item._doc, ...arrMap[id] };
    arrMap[id][childrenFields] = arrMap[id][childrenFields] || undefined;

    const treeItem = arrMap[id];
    if (!pid) {
      result.push(treeItem);
    } else {
      if (!arrMap[pid]) {
        arrMap[pid] = {};
      }
      arrMap[pid][childrenFields] = arrMap[pid][childrenFields] || [];
      arrMap[pid][childrenFields].push(treeItem);
    }
  }
  return result;
}
