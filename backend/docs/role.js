const roleBody = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    roleName: { type: 'string', description: '角色名称' }
  }
};

const roleSchema = {
  queryList: {
    description: '获取角色列表',
    tags: ['role'],
    summary: '获取所有角色列表'
  }
};

export default roleSchema;
