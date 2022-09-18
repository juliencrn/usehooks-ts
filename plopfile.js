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
        path: 'src/{{camelCase name}}/index.ts',
        templateFile: 'templates/plop/hooks/hook/index.ts.hbs',
      },

      // Create the hook file itself
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'templates/plop/hooks/hook/hook.ts.hbs',
      },

      // Create the test file
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: 'templates/plop/hooks/hook/hook.test.ts.hbs',
      },

      // Create the markdown file to present the hook (doc)
      {
        data: {
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.mdx',
        templateFile: 'templates/plop/hooks/hook/post.mdx.hbs',
      },

      // Create the demo react component file
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.demo.tsx',
        templateFile: 'templates/plop/hooks/hook/demo.tsx.hbs',
      },

      // Update the global hooks index file
      {
        type: 'append',
        path: 'src/index.ts',
        templateFile: 'templates/plop/hooks/index.ts.hbs',
      },
    ],
  })
}
