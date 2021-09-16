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
      /**
       * usehooks-ts packages side
       *
       * - Create the hook index file (for quick export)
       * - Create the hook file itself
       * - Create the test file
       * - Update the global hooks index file
       */
      {
        type: 'add',
        path: 'packages/usehooks-ts/src/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/hooks/usehooks-ts/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/usehooks-ts/src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'plop-templates/hooks/usehooks-ts/hook.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/usehooks-ts/src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: 'plop-templates/hooks/usehooks-ts/hook.test.ts.hbs',
      },
      {
        type: 'append',
        path: 'packages/usehooks-ts/src/index.ts',
        templateFile: 'plop-templates/hooks/index.ts.hbs',
      },

      /**
       * frontend side
       *
       * - Create the hook index file (for quick export)
       * - Create the markdown file to present the hook
       * - Create the demo react component file
       * - Update the global hooks index file
       */
      {
        type: 'add',
        path: 'packages/frontend/src/hooks-doc/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/hooks/frontend/index.ts.hbs',
      },
      {
        data: {
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        type: 'add',
        path: 'packages/frontend/src/hooks-doc/{{camelCase name}}/{{camelCase name}}.mdx',
        templateFile: 'plop-templates/hooks/frontend/post.mdx.hbs',
      },
      {
        type: 'add',
        path: 'packages/frontend/src/hooks-doc/{{camelCase name}}/{{camelCase name}}.demo.tsx',
        templateFile: 'plop-templates/hooks/frontend/demo.tsx.hbs',
      },
      {
        type: 'append',
        path: 'packages/frontend/src/hooks-doc/index.ts',
        templateFile: 'plop-templates/hooks/index.ts.hbs',
      },
    ],
  })
}
