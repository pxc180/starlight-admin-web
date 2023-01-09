export default function (plop) {
  plop.setGenerator('module', {
    description: '创建一个新的模块',
    prompts: [
      { type: 'input', name: 'module', message: '请输入模块名称' },
      { type: 'input', name: 'name', message: '请输入模块中文名称' }
    ],
    actions: () => {
      const module = '{{module}}';
      const name = '{{name}}';
      const actions = [
        {
          type: 'add',
          path: `models/${module}.js`,
          templateFile: 'templates/modelTemplate.hbs',
          force: true,
          data: {
            module,
            name
          }
        },
        {
          type: 'add',
          path: `schemas/${module}.js`,
          templateFile: 'templates/schemaTemplate.hbs',
          force: true,
          data: {
            module,
            name
          }
        },
        {
          type: 'add',
          path: `controllers/${module}Controller.js`,
          templateFile: 'templates/controllerTemplate.hbs',
          force: true,
          data: {
            module,
            name
          }
        },
        {
          type: 'add',
          path: `routes/modules/${module}.js`,
          templateFile: 'templates/routeTemplate.hbs',
          force: true,
          data: {
            module,
            name
          }
        }
      ];
      return actions;
    }
  });
}
