import { PlopTypes } from '@turbo/gen'
import format from 'date-fns/format'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('hook', {
    description: 'Create a post',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'post name please (eg: "use test")',
      },
    ],
    actions: [
      // Create the hook file itself
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'templates/hook/hook.ts.hbs',
      },

      // Create the test file
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: 'templates/hook/hook.test.ts.hbs',
      },

      // Create the markdown file to present the hook (doc)
      {
        data: {
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.md',
        templateFile: 'templates/hook/hook.mdx.hbs',
      },

      // Create the demo react component file
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.demo.tsx',
        templateFile: 'templates/hook/hook.demo.tsx.hbs',
      },

      // Update the global hooks index file
      {
        type: 'append',
        path: 'src/index.ts',
        templateFile: 'templates/index.ts.hbs',
      },
    ],
  })
}
