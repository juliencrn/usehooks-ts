import { GatsbyNode } from 'gatsby'
import path from 'path'
// import fetch from 'node-fetch'

interface MdxNode {
  id: string
  fileAbsolutePath: string
}
interface Page extends MdxNode {
  frontmatter: {
    path?: string
  }
}

interface Post extends MdxNode {
  frontmatter: {
    path?: string
    gistFilename?: string
    gistId?: string
  }
}

// const fetchGist = async (gistId: string) => {
//   const url = `https://api.github.com/gists/${gistId}`
//   const response = await fetch(url, {
//     headers: {
//       Authorization: `token ${process.env.GATSBY_GITHUB_TOKEN}`,
//     },
//   })
//   const data = await response.json()
//   return data
// }

interface Query {
  pages: { nodes: Page[] }
  posts: { nodes: Post[] }
}

export const createPages: GatsbyNode['createPages'] = async args => {
  const { actions, graphql, reporter } = args

  const results = await graphql<Query>(`
    {
      pages: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/content/pages/" } }
      ) {
        nodes {
          id
          fileAbsolutePath
          frontmatter {
            path
          }
        }
      }

      posts: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      ) {
        nodes {
          id
          fileAbsolutePath
          frontmatter {
            path
            gistFilename
            gistId
          }
        }
      }
    }
  `)

  if (results.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL posts query.`,
      results.errors,
    )
    return
  }

  if (results.data) {
    const {
      pages: { nodes: pages },
      posts: { nodes: posts },
    } = results.data

    if (pages.length > 0) {
      pages.forEach(page => {
        if (!page.frontmatter?.path) {
          reporter.warn(`"path" is missing in "${page.fileAbsolutePath}"`)
          return
        }

        actions.createPage({
          path: `${page.frontmatter.path}/`,
          component: path.resolve(`./src/templates/page.tsx`),
          context: { id: page.id },
        })
      })
    }

    if (posts.length > 0) {
      posts.forEach(post => {
        const { id, frontmatter, fileAbsolutePath } = post

        if (!frontmatter?.path) {
          reporter.warn(`"path" is missing in "${fileAbsolutePath}"`)
          return
        }
        if (!frontmatter?.gistId) {
          reporter.warn(`"gistId" is missing in "${fileAbsolutePath}"`)
          return
        }
        if (!frontmatter?.gistFilename) {
          reporter.warn(`"gistFilename" is missing in "${fileAbsolutePath}"`)
          return
        }

        actions.createPage({
          path: `${post.frontmatter.path}/`,
          component: path.resolve(`./src/templates/post.tsx`),
          context: {
            id,
          },
        })
      })
    }
  }
}

/*

  posts: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      ) {
        nodes {
          id
          fileAbsolutePath
          frontmatter {
            path
            gistFilename
            gistId
          }
        }
      }


       if (posts.nodes) {
      posts.nodes.map(async node => {
        const errorMessage = messageMissingField(node)
        const { id, frontmatter } = node

        if (!frontmatter?.path) {
          reporter.warn(errorMessage('path'))
          return
        }
        if (!frontmatter?.gistId) {
          reporter.warn(errorMessage('gistId'))
          return
        }
        if (!frontmatter?.gistFilename) {
          reporter.warn(errorMessage('gistFilename'))
          return
        }

        // fetchGist(frontmatter.gistId)
        //   .then(gist => {
        //     actions.createPage({
        //       path: `${frontmatter.path}/`,
        //       component: path.resolve(`./src/templates/post.tsx`),
        //       context: {
        //         gist: {
        //           url: gist.html_url,
        //           updated: gist.updated_at,
        //           code: gist.files[frontmatter.gistFilename as string].content,
        //         },
        //         postId: id,
        //       },
        //     })
        //   })
        //   .catch(() => {
        //     reporter.warn(
        //       `Cannot fetch Github Gists for "${node.frontmatter.path}"`,
        //     )
        //   })
      })
    }

      */
