import { GatsbyNode, Reporter } from 'gatsby'
import path from 'path'
import fetch from 'node-fetch'

interface PostFrontmatter {
  path: string
  templateKey: 'page' | 'post'
  gistFilename: string
  gistId: string
}

interface Node {
  id: string
  fileAbsolutePath: string
  frontmatter: Partial<PostFrontmatter>
}

interface PostNode extends Node {
  templateKey: 'post'
  frontmatter: PostFrontmatter
}

interface PageNode extends Node {
  templateKey: 'page'
  frontmatter: Omit<PostFrontmatter, 'gistFilename' | 'gistId'>
}

const messageMissingField = (node: Node) => (property: string) => {
  return `[Field missing: "${property}"] Cannot create "${node.fileAbsolutePath}"`
}

const fetchGist = async (gistId: string) => {
  const url = `https://api.github.com/gists/${gistId}`
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GATSBY_GITHUB_TOKEN}`,
    },
  })
  const data = await response.json()
  return data
}

/*
 * Fetch gist code from github.com
 * And data gist data in post data
 */
const getGist = async (node: PostNode) => {
  try {
    const { gistId, gistFilename } = node.frontmatter
    const gist = await fetchGist(gistId)

    return {
      url: gist.html_url,
      updated: gist.updated_at,
      code: gist.files[gistFilename].content,
    }
  } catch (error) {
    // TODO use Gatsby.reporter
    console.log(error)
    throw new Error('Error on github API fetch')
  }
}

type FilteredNodes = { posts: PostNode[]; pages: PageNode[] }

// TODO: Instead -> Create 2 files (e.g. createPosts)
function separateAllMdx(nodes: Node[], reporter: Reporter): FilteredNodes {
  return nodes.reduce(
    (prev, node) => {
      const errorMessage = messageMissingField(node)
      const item = node.frontmatter

      if (!item?.templateKey) {
        reporter.info(errorMessage('templateKey'))
        return prev
      }
      if (!item?.path) {
        reporter.info(errorMessage('path'))
        return prev
      }

      switch (node.frontmatter.templateKey) {
        case 'post':
          if (!node.frontmatter.gistId) {
            reporter.info(errorMessage('gistId'))
            return prev
          }
          if (!node.frontmatter.gistFilename) {
            reporter.info(errorMessage('gistFilename'))
            return prev
          }
          return { ...prev, posts: [...prev.posts, node as PostNode] }

        case 'page':
          return { ...prev, pages: [...prev.pages, node as PageNode] }

        // Else no adds current post
        default:
          return prev
      }
    },
    { posts: [], pages: [] } as FilteredNodes,
  )
}

interface Query {
  allMdx: {
    nodes: Node[]
  }
}

export const createPages: GatsbyNode['createPages'] = async args => {
  const { actions, graphql, reporter } = args

  const results = await graphql<Query>(`
    {
      allMdx {
        nodes {
          id
          fileAbsolutePath
          frontmatter {
            templateKey
            path
            gistFilename
            gistId
          }
        }
      }
    }
  `)

  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL posts query.`)
    return
  }

  if (results.data) {
    if (!results.data.allMdx.nodes) {
      reporter.panic('There are not posts or pages to create')
    }

    // Range allMdx into "post" or "page"
    // And filter Node with missing properties
    const { posts, pages } = separateAllMdx(
      results.data?.allMdx.nodes,
      reporter,
    )

    await Promise.all([
      ...posts.map(async post => {
        const gist = await getGist(post)

        actions.createPage({
          path: `${post.frontmatter.path}/`,
          component: path.resolve(`./src/templates/post.tsx`),
          context: {
            gist,
            postId: post.id,
          },
        })
      }),

      ...pages.map(({ id, frontmatter }) => {
        actions.createPage({
          path: `${frontmatter.path}/`,
          component: path.resolve(`./src/templates/page.tsx`),
          context: { pageId: id },
        })
      }),
    ])
  }
}
