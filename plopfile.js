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
        path: 'lib/src/{{camelCase name}}/index.ts',
        templateFile: 'templates/plop/hooks/lib/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'lib/src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'templates/plop/hooks/lib/hook.ts.hbs',
      },
      {
        type: 'add',
        path: 'lib/src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: 'templates/plop/hooks/lib/hook.test.ts.hbs',
      },
      {
        type: 'append',
        path: 'lib/src/index.ts',
        templateFile: 'templates/plop/hooks/index.ts.hbs',
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
        path: 'site/src/hooks-doc/{{camelCase name}}/index.ts',
        templateFile: 'templates/plop/hooks/site/index.ts.hbs',
      },
      {
        data: {
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        type: 'add',
        path: 'site/src/hooks-doc/{{camelCase name}}/{{camelCase name}}.mdx',
        templateFile: 'templates/plop/hooks/site/post.mdx.hbs',
      },
      {
        type: 'add',
        path: 'site/src/hooks-doc/{{camelCase name}}/{{camelCase name}}.demo.tsx',
        templateFile: 'templates/plop/hooks/site/demo.tsx.hbs',
      },
      {
        type: 'append',
        path: 'site/src/hooks-doc/index.ts',
        templateFile: 'templates/plop/hooks/index.ts.hbs',
      },
    ],
  })
}
