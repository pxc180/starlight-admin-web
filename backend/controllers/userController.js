import mongoose from 'mongoose';
import boom from '@hapi/boom';

import User from '../models/user.js';

import { paramsToSelector } from '../utils/filter.js';
import pageQuery from '../utils/pagingQuery.js';

import fastify from '../fastify.js';

async function getList(req, res) {
  try {
    const { pageNo, pageSize, _t, ...conditions } = req.query;

    const result = await pageQuery({
      model: User,
      pageNo,
      pageSize,
      queryParams: paramsToSelector(conditions),
      returnFields: {
        password: 0
      },
      sortParams: { createTime: -1 },
      populateParams: { path: 'roleId', select: { id: 1, roleName: 1 } }
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

async function queryByRoleId(req, res) {
  try {
    const { pageNo, pageSize, roleId, _t, ...conditions } = req.query;

    const result = await pageQuery({
      model: User,
      pageNo,
      pageSize,
      queryParams: {
        roleId: mongoose.Types.ObjectId(roleId),
        ...paramsToSelector(conditions)
      },
      returnFields: {
        password: 0
      },
      sortParams: { createTime: -1 },
      populateParams: { path: 'roleId', select: { id: 1, roleName: 1 } }
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

async function get(req, res) {
  try {
    const id = req.query.id;
    const user = await User.findById(id, {
      password: 0
    });
    if (user) {
      res.send({
        statusCode: res.statusCode,
        data: user,
        message: '操作成功!'
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

async function add(req, res) {
  try {
    const user = new User({
      ...req.body,
      createBy: '',
      updateBy: ''
    });

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
    const user = { ...req.body, updateBy: '' };
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

async function userLogin(req, res) {
  try {
    const { userName, password } = req.query;
    const user = await User.find({ userName: userName });
    if (!user.length) {
      res.send({
        statusCode: 500,
        data: null,
        success: false,
        message: '该用户不存在，请注册'
      });
      return;
    }
    if (user[0].password !== password) {
      res.send({
        statusCode: 500,
        data: null,
        success: false,
        message: '账号或密码错误'
      });
      return;
    }
    const token = fastify.jwt.sign({ ...user });
    res.send({
      statusCode: res.statusCode,
      data: { token: token, userInfo: user[0] },
      success: true,
      message: '登录成功'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

export default {
  getList,
  queryByRoleId,
  get,
  add,
  update,
  deleteUser,
  userLogin
};
