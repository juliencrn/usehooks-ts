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
      // Create the hook index file (for quick export)
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/index.ts',
        templateFile: 'generators/hooks/index.ts.hbs',
      },

      // Create the markdown file to present the hook
      {
        data: {
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.mdx',
        templateFile: 'generators/hooks/post.mdx.hbs',
      },

      // Create the demo react component file
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.demo.tsx',
        templateFile: 'generators/hooks/demo.tsx.hbs',
      },

      // Create the hook file itself
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'generators/hooks/hook.ts.hbs',
      },

      // Create the test file
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: 'generators/hooks/hook.test.ts.hbs',
      },

      // Update the global hooks index file
      {
        type: 'append',
        path: 'src/hooks/index.ts',
        templateFile: 'generators/hooksIndex.ts.hbs',
      },
    ],
  })
}
