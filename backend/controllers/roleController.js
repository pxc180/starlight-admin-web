import boom from '@hapi/boom';
import Role from '../models/role.js';
import dayjs from 'dayjs';

async function queryList(req, res) {
  try {
    const { pageNo, pageSize, _t, ...conditions } = req.query;

    let filter = {};
    if (Object.keys(conditions).length) {
      filter = { $and: [] };
      for (const key in conditions) {
        if (Object.hasOwnProperty.call(conditions, key)) {
          let obj = {};
          obj[key] = { $regex: new RegExp(conditions[key], 'i') };
          filter.$and.push(obj);
        }
      }
    }

    const total = await Role.count();
    const role = await Role.find(filter)
      .skip(((parseInt(pageNo) || 1) - 1) * pageSize)
      .limit(parseInt(pageSize) || 10)
      .sort({ createTime: -1 });

    res.send({
      statusCode: res.statusCode,
      data: {
        result: role,
        current: +pageNo || 1,
        size: +pageSize || 10,
        total: total
      },
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
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const role = new Role({
      ...req.body,
      createTime: time,
      createBy: '',
      updateTime: time,
      updateBy: ''
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
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const role = { ...req.body, updateTime: time, updateBy: '' };
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
