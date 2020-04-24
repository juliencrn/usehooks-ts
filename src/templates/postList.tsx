import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Pagination from '@material-ui/lab/Pagination'

import Layout from '../layout'
import SEO from '../components/seo'
import { PageTemplate, Post } from '../interfaces'
import PostCard from '../components/PostCard'
import Hero from '../components/hero'
import useSiteMetadata from '../hooks/useSiteMetadata'

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
}))

export interface PostListTemplateProps extends PageTemplate {
  pageContext: {
    numPages: number
    currentPage: number
    posts: Array<{ node: Post }>
  }
}

const PostListTemplate: FC<PostListTemplateProps> = ({ pageContext }) => {
  const classes = useStyles()
  const { title, description } = useSiteMetadata()
  const { numPages, currentPage, posts } = pageContext

  const handleNavigate = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(value >= 2 ? `/${value}` : `/`)
  }

  return (
    <Layout>
      <SEO title={title} description={description} />

      <Hero title={title} description={description} />

      <Container maxWidth="md">
        {posts.map(({ node }) => (
          <PostCard key={node.frontmatter.path} {...node} />
        ))}

        <div className={classes.pagination}>
          <Pagination
            count={numPages}
            page={currentPage}
            showFirstButton
            showLastButton
            onChange={handleNavigate}
          />
        </div>
      </Container>
    </Layout>
  )
}

export default PostListTemplate
