import boom from '@hapi/boom';
import Menu from '../models/menu.js';
import dayjs from 'dayjs';

import { paramsToSelector } from '../utils/filter.js';

async function queryAll(req, res) {
  try {
    const { _t, ...conditions } = req.query;

    const queryParams = paramsToSelector(conditions);

    const total = await Menu.count(queryParams);
    const menu = await Menu.find(queryParams);

    res.send({
      statusCode: res.statusCode,
      data: {
        result: menu,
        current: 1,
        size: total,
        total: total
      },
      message: '操作成功!'
    });
  } catch (error) {
    throw boom.boomify(error);
  }
}

async function add(req, res) {
  try {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const menu = new Menu({
      ...req.body,
      createTime: time,
      createBy: '',
      updateTime: time,
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

export default { queryAll, add };
