/* eslint-disable react/display-name */
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Typography, TypographyProps, LinkProps } from '@material-ui/core'
import { MDXRenderer, MDXRendererProps } from 'gatsby-plugin-mdx'

import Code from './code'

/**
 * TODO : Add missing components
 * @link https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/?=mdx#mdxprovider
 */

const MdxRenderer = ({ children }: Readonly<MDXRendererProps>) => (
  <MDXProvider
    components={{
      h1: (props: TypographyProps) => <Typography variant="h1" {...props} />,
      h2: (props: TypographyProps) => <Typography variant="h2" {...props} />,
      h3: (props: TypographyProps) => <Typography variant="h3" {...props} />,
      h4: (props: TypographyProps) => <Typography variant="h4" {...props} />,
      h5: (props: TypographyProps) => <Typography variant="h5" {...props} />,
      h6: (props: TypographyProps) => <Typography variant="h6" {...props} />,
      // a: (props: LinkProps) => <Link {...props} />,
      p: (props: TypographyProps) => <Typography variant="body1" {...props} />,
      code: (props: any) => <Code code={props.children.toString()} />,
      inlineCode: (props: TypographyProps) => (
        <Typography
          variant="body1"
          style={{ fontFamily: 'Fira Code' }}
          {...props}
        />
      ),
    }}
  >
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
)

export default MdxRenderer
