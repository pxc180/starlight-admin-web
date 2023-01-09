export default {
  description: '创建模块的基础API接口（增删改查）',
  prompts: [
    { type: 'input', name: 'module', message: '请输入模块名称' },
    { type: 'input', name: 'chinese', message: '请输入模块中文名称' }
  ],
  actions: () => {
    const module = '{{module}}'
    const chinese = '{{chinese}}'
    const actions = [
      {
        type: 'add',
        path: `src/api/modules/${module}.js`,
        templateFile: 'templates/api/index.hbs',
        force: true,
        data: {
          module,
          chinese
        }
      }
    ]
    return actions
  }
}
