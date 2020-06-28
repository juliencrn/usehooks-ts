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
        data: {
          gistId: 'gistId super',
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        type: 'add',
        path: 'content/posts/{{camelCase name}}.md',
        templateFile: 'plop-templates/post.md.hbs',
      },
    ],
  })
}
