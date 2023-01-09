export default {
  description: '创建整个模块页面，包含列表页以及新增、编辑数据表单',
  prompts: [
    { type: 'input', name: 'module', message: '请输入模块名称' },
    { type: 'input', name: 'chinese', message: '请输入模块中文名称' },
    {
      type: 'list',
      name: 'form',
      message: '表单显示形式',
      choices: ['Modal', 'Drawer']
    }
  ],
  actions: () => {
    const module = '{{module}}'
    const form = '{{form}}'
    const chinese = '{{chinese}}'
    const actions = [
      {
        type: 'add',
        path: `src/views/${module}/index.vue`,
        templateFile: 'templates/page/list.hbs',
        force: true,
        data: {
          module,
          form,
          chinese
        }
      },
      {
        type: 'add',
        path: `src/views/${module}/components/${module}From${form}.vue`,
        templateFile: 'templates/page/form.hbs',
        force: true,
        data: {
          module,
          form
        }
      }
    ]
    return actions
  }
}
