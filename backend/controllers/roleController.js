import boom from '@hapi/boom';
import Role from '../models/role.js';

import { paramsToSelector } from '../utils/filter.js';
import pageQuery from '../utils/pagingQuery.js';

async function queryAll(req, res) {
  try {
    const role = await Role.find({}, { id: 1, roleName: 1 });

    res.send({
      statusCode: res.statusCode,
      data: role,
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function queryList(req, res) {
  try {
    const { pageNo, pageSize, _t, ...conditions } = req.query;

    const result = await pageQuery({
      model: Role,
      pageNo,
      pageSize,
      queryParams: paramsToSelector(conditions),
      sortParams: { createTime: -1 }
    });

    res.send({
      statusCode: res.statusCode,
      data: result,
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function queryById(req, res) {
  try {
    const id = req.query.id;
    const role = await Role.findById(id);

    res.send({
      statusCode: res.statusCode,
      data: role,
      message: role ? '操作成功!' : '未查询到数据!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function add(req, res) {
  try {
    const actionUser = req.user['0'];

    const role = new Role({
      ...req.body,
      createBy: actionUser._id
    });

    await role.save();

    res.send({
      statusCode: res.statusCode,
      data: role,
      message: '添加成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function update(req, res) {
  try {
    const actionUser = req.user['0'];

    const role = { ...req.body, updateBy: actionUser._id };
    const { ...updateData } = role;

    const update = await Role.findByIdAndUpdate(role.id, updateData, {
      new: true
    });

    res.send({
      statusCode: res.statusCode,
      data: update,
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function deleteRole(req, res) {
  try {
    const id = req.query.id;
    const role = await Role.findByIdAndRemove(id);

    res.send({
      statusCode: res.statusCode,
      data: role,
      message: role ? '删除成功!' : '未查询到数据!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function savePermissions(req, res) {
  try {
    const actionUser = req.user['0'];

    const { roleId, menuIds } = req.body;
    await Role.updateOne(
      { _id: roleId },
      { $set: { menuIds: menuIds, updateBy: actionUser._id } }
    );

    res.send({
      statusCode: res.statusCode,
      data: roleId,
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

export default {
  queryAll,
  queryList,
  queryById,
  add,
  update,
  deleteRole,
  savePermissions
};
