import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import Info from '../components/Info'

export default ({ data }) => {
  const post = data.markdownRemark
  let mainFluid = post.frontmatter.image.childImageSharp.fluid
  return (
    <Layout>
      <div>
        <Img fluid={mainFluid} />
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <aside>
        <Info />
      </aside>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
