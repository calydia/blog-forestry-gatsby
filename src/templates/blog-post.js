import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';

export default ({ data }) => {
  const post = data.markdownRemark;
  let mainFluid = post.frontmatter.main_image.childImageSharp.fluid;
  return (
    <Layout>
      <div className="blog-wrapper">
        <Img fluid={mainFluid} />
        <div className="blog-content">
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.frontmatter.body }} />
        </div>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        body
        main_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
