import boom from '@hapi/boom';
import User from '../models/user.js';

async function getList(req, res) {
  try {
    const user = await User.find();
    res.send({ statusCode: res.statusCode, data: user, message: '操作成功!' });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function get(req, res) {
  try {
    const id = req.query.id;
    const user = await User.findById(id);
    res.send({ statusCode: res.statusCode, data: user, message: '操作成功!' });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function add(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({
      statusCode: res.statusCode,
      data: user,
      message: '添加成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function update(req, res) {
  try {
    const user = req.body;
    const { ...updateData } = user;
    const update = await User.findByIdAndUpdate(user.id, updateData, {
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

async function deleteUser(req, res) {
  try {
    const id = req.query.id;
    const user = await User.findByIdAndRemove(id);
    if (user) {
      res.send({
        statusCode: res.statusCode,
        data: user,
        message: '删除成功!'
      });
    } else {
      res.send({
        statusCode: res.statusCode,
        data: user,
        message: '未查询到数据!'
      });
    }
  } catch (error) {
    throw boom.boomify(error);
  }
}

export default { getList, get, add, update, deleteUser };
