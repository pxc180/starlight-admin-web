import boom from '@hapi/boom';
import Role from '../models/role.js';

async function queryList(req, res) {
  try {
    const role = await Role.find();
    res.send({ statusCode: res.statusCode, data: role, message: '操作成功' });
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
    const role = new Role(req.body);
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
    const role = req.body;
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

export default { queryList, queryById, add, update, deleteRole };
