import boom from '@hapi/boom';
import Menu from '../models/menu.js';

import { paramsToSelector } from '../utils/filter.js';
import { arrayToTree } from '../utils/array.js';
import { getTreeDeleteIds } from '../utils/tree.js';

async function queryAll(req, res) {
  try {
    const { pageNo, pageSize, _t, ...conditions } = req.query;

    const queryParams = paramsToSelector(conditions);

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

    res.send({
      statusCode: res.statusCode,
      data: {
        result,
        current: 1,
        size: result.length,
        total: result.length
      },
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function add(req, res) {
  try {
    const menu = new Menu({
      ...req.body,
      createBy: '',
      updateBy: ''
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
    const menu = { ...req.body, updateBy: '' };
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

export default { queryAll, add, edit, deleteMenu };
