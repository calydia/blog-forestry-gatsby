import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Info from '../components/Info';

export default ({ data }) => {
  const content = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{content.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.frontmatter.body }} />

        <div className="blog-list">
          {data.allMarkdownRemark.edges.map((node, index) => {
            let listingFluid =
              node.node.frontmatter.listing_image.childImageSharp.fluid;
            return (
              <div key={index}>
                {node.node.frontmatter.title}
                <span className="blog-info">
                  {node.node.frontmatter.post_date} |{' '}
                  {node.node.frontmatter.category}
                </span>
                <Img fluid={listingFluid} />
              </div>
            );
          })}
        </div>
        <aside className="sidebar">
          <Info />
        </aside>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query($slug: String!, $category: [String]) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        body
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "blog-post" }, category: { in: $category } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            post_date(formatString: "DD.MM.YYYY")
            category
            listing_image {
              childImageSharp {
                fluid(maxWidth: 1025) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
