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

export default { queryList };
