/**
 * 查询树结构中给定id的所有子节点
 * @param {Mongoose Documents} model
 * @param {Array} parentIds 父节点id
 * @param {String} parentFields 存储父节点id的字段
 *
 * @returns 所有层级子节点的集合
 */
async function getTreeChildren(
  model,
  parentIds = [],
  parentFields = 'parentId'
) {
  let result = [];
  const selector = {};

  selector[parentFields] = { $in: parentIds };
  let children = await model.find(selector);

  if (children && children.length) {
    let res = await getTreeChildren(
      model,
      children.map(v => v._id.toString())
    );
    result.push(...children.map(v => v._id.toString()), ...res);
  }

  return result;
}

/**
 * 查询树结构中所有需要删除的id
 * @param {Mongoose Documents} model
 * @param {String} id 需要删除的树结构中的节点id
 *
 * @returns 所有需要删除id的集合
 */
async function getTreeDeleteIds(model, id) {
  const ids = [];

  const result = await model.find({ _id: { $in: [id] } });

  if (result && result.length) {
    ids.push(...result.map(v => v._id.toString()));
    let childrenIds = await getTreeChildren(
      model,
      result.map(v => v._id.toString())
    );

    if (childrenIds && childrenIds.length) {
      ids.push(...childrenIds);
    }
  }

  return ids;
}

export { getTreeChildren, getTreeDeleteIds };
