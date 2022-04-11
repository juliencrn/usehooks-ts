const query = `
  {
    algoliaPosts: allMdx(limit: 1000, filter: {fields: {type: {eq: "post"}}}) {
      nodes {
        id
        excerpt(pruneLength: 155)
        fields {
          path
          name
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
          name
        }
      }
    }
    demos: allMdx(limit: 1000, filter: {fields: {type: {eq: "demo"}}}) {
      nodes {
        id
        fields {
          name
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
      ({ fields: { name } }) => name === fields.name,
    )

    // Check if have the corresponding hook demo
    const demo = data.demos.nodes.find(
      ({ fields: { name } }) => name === fields.name,
    )

    if (hook && demo) {
      matchesPosts.push(post)
    }
  })

  return matchesPosts.map(({ frontmatter, excerpt, fields }) => {
    const id = fields.path.split('/')[1]
    return {
      objectID: id,
      id,
      path: `/react-hook${fields.path}`,
      title: frontmatter.title,
      // Allow querying by title without the "use" prefix
      titleWithoutUse: frontmatter.title.substr(3),
      excerpt,
    }
  })
}

const queries = [
  {
    query,
    transformer,
    indexName: `Posts`,
  },
]

module.exports = queries
