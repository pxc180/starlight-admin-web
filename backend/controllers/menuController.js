import boom from '@hapi/boom';
import Menu from '../models/menu.js';
import Role from '../models/role.js';

import { paramsToSelector } from '../utils/filter.js';
import { arrayToTree } from '../utils/array.js';
import { getTreeDeleteIds } from '../utils/tree.js';

async function getMenuTree(queryParams) {
  const menu = await Menu.find(queryParams).sort({ sortNo: 0 });

  let result = [];

  if (Object.keys(queryParams).length) {
    result = menu;
  } else {
    result = arrayToTree({
      arr: menu,
      fieldsNames: { id: '_id', pid: 'parentId', children: 'children' }
    });
  }

  return result;
}

async function queryAll(req, res) {
  try {
    const { pageNo, pageSize, _t, ...conditions } = req.query;

    const queryParams = paramsToSelector(conditions);

    const menu = await getMenuTree(queryParams);

    res.send({
      statusCode: res.statusCode,
      data: {
        result: menu,
        current: 1,
        size: menu.length,
        total: menu.length
      },
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function queryMenuByRoleId(req, res) {
  const menu = await getMenuTree({});
  const role = await Role.findOne({ _id: req.query.roleId }, { menuIds: 1 });

  res.send({
    statusCode: res.statusCode,
    data: {
      selected: role.menuIds,
      menus: menu
    },
    message: '操作成功!'
  });
}

async function add(req, res) {
  try {
    const actionUser = req.user['0'];
    const menu = new Menu({
      ...req.body,
      createBy: actionUser._id
    });

    await menu.save();

    res.send({
      statusCode: res.statusCode,
      data: menu,
      message: '添加成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function edit(req, res) {
  try {
    const actionUser = req.user['0'];
    const menu = { ...req.body, updateBy: actionUser._id };
    const { ...updateData } = menu;

    const update = await Menu.findByIdAndUpdate(menu.id, updateData, {
      new: true
    });

    res.send({
      statusCode: res.statusCode,
      data: update.id,
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function deleteMenu(req, res) {
  try {
    const id = req.query.id;

    const ids = await getTreeDeleteIds(Menu, id);

    if (ids && ids.length) {
      let role = await Role.find({ menuIds: { $in: ids } });
      let roleBulk = role.map(item => ({
        updateOne: {
          filter: {
            _id: { $eq: item._id }
          },
          update: {
            $set: {
              menuIds: item.menuIds.filter(v => !ids.includes(v))
            }
          }
        }
      }));
      await Role.bulkWrite([...roleBulk], { ordered: false });
      await Menu.bulkWrite(
        [{ deleteMany: { filter: { _id: { $in: ids } } } }],
        { ordered: false }
      );

      res.send({
        statusCode: res.statusCode,
        data: ids,
        message: '删除成功!'
      });
    } else {
      res.send({
        statusCode: res.statusCode,
        data: [],
        message: '未查询到数据!'
      });
    }
  } catch (error) {
    throw boom.boomify(error);
  }
}

export default { queryAll, add, edit, deleteMenu, queryMenuByRoleId };
