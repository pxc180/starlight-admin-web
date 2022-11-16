const menuBody = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    parentId: { type: 'string', description: '父Id' },
    name: { type: 'string', description: '菜单标题' },
    url: { type: 'string', description: '菜单路径' },
    component: { type: 'string', description: '页面组件' },
    hide: { type: 'number', description: '是否隐藏' },
    redirect: { type: 'string', description: '跳转地址' },
    sortNo: { type: 'number', description: '排序' },
    icon: { type: 'string', description: '菜单图标' },
    keepAlive: { type: 'number', description: '是否缓存页面' },
    delFlag: { type: 'number', description: '删除状态 0正常 1已删除' }
  }
};

const menuSchema = {
  queryAll: {
    description: '获取所有菜单信息',
    tags: ['menu'],
    summary: '获取所有菜单信息'
  },
  add: {
    description: '创建新的菜单',
    tags: ['menu'],
    summary: '增加新的菜单',
    body: {
      ...menuBody
    }
  },
  delete: {
    description: '删除菜单',
    tags: ['menu'],
    summary: '通过id删除菜单',
    querystring: {
      ...menuBody,
      required: ['id']
    }
  }
};

export default menuSchema;
