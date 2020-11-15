const postQuery = `
  {
    algoliaPosts: allMdx(limit: 1000, filter: {fields: {type: {eq: "post"}}}) {
      nodes {
        id
        excerpt(pruneLength: 155)
        fields {
          path
          hookName
        }
        frontmatter {
          title
        }
      }
    }
    hooks: allMdx(limit: 1000, filter: {fields: {type: {eq: "hook"}}}) {
      nodes {
        id
        fields {
          hookName
        }
      }
    }
    demos: allMdx(limit: 1000, filter: {fields: {type: {eq: "demo"}}}) {
      nodes {
        id
        fields {
          hookName
        }
      }
    }
  }
`

const transformer = ({ data }) => {
  const matchesPosts = []
  data.algoliaPosts.nodes.forEach(post => {
    const { fields } = post

    // Check if have the corresponding hook
    const hook = data.hooks.nodes.find(
      ({ fields: { hookName } }) => hookName === fields.hookName,
    )

    // Check if have the corresponding hook demo
    const demo = data.demos.nodes.find(
      ({ fields: { hookName } }) => hookName === fields.hookName,
    )

    if (hook && demo) {
      matchesPosts.push(post)
    }
  })

  return matchesPosts.map(({ frontmatter, excerpt, fields }) => ({
    id: fields.path,
    path: `/react-hook${fields.path}`,
    title: frontmatter.title,
    excerpt,
  }))
}

const algoliaQueries = [
  {
    query: postQuery,
    transformer,
    indexName: `Posts`,
  },
]

module.exports = algoliaQueries
