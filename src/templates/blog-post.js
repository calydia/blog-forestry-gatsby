import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Info from '../components/Info';

export default ({ data }) => {
  const post = data.markdownRemark;
  let mainFluid = post.frontmatter.main_image.childImageSharp.fluid;
  return (
    <Layout>
      <div className="blog-wrapper">
        <Img fluid={mainFluid} />
        <div className="blog-content">
          <h1>{post.frontmatter.title}</h1>
          <span className="blog-info">
            {post.frontmatter.post_date} | {post.frontmatter.category}
          </span>
          <div dangerouslySetInnerHTML={{ __html: post.frontmatter.body }} />
        </div>

        <aside className="sidebar">
          <Info />
        </aside>
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
        post_date(formatString: "DD.MM.YYYY")
        category
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
