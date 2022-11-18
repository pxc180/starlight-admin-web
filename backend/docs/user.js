const userBody = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userName: { type: 'string', description: '用户名' },
    roleId: { type: 'string', description: '角色ID' }
  }
};

const userSchema = {
  list: {
    description: '获取用户列表',
    tags: ['user'],
    summary: '获取所有用户列表'
  },
  queryByRoleId: {
    description: '根据角色Id查询用户',
    tags: ['user'],
    summary: '根据角色Id查询用户',
    querystring: {
      ...userBody,
      required: ['roleId']
    }
  },
  detail: {
    description: '获取用户详情',
    tags: ['user'],
    summary: '通过id获取用户详情',
    querystring: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id']
    }
  },
  add: {
    description: '创建新的用户',
    tags: ['user'],
    summary: '增加新的用户',
    body: {
      ...userBody
    }
  },
  update: {
    description: '更新用户详情',
    tags: ['user'],
    summary: '通过id更新用户详情',
    body: {
      ...userBody,
      required: ['id']
    }
  },
  delete: {
    description: '删除用户',
    tags: ['user'],
    summary: '通过id删除用户',
    querystring: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id']
    }
  }
};

export default userSchema;
