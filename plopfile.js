/* eslint-disable @typescript-eslint/no-var-requires */
const format = require('date-fns/format')

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a post',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'post name please (eg: "use test")',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/hooks/index.ts.hbs',
      },
      {
        data: {
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.mdx',
        templateFile: 'plop-templates/hooks/post.mdx.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.demo.tsx',
        templateFile: 'plop-templates/hooks/demo.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'plop-templates/hooks/hook.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/hooks/index.ts',
        templateFile: 'plop-templates/hooksIndex.ts.hbs',
      },
    ],
  })
}
