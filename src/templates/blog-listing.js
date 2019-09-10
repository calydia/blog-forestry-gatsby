import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Info from '../components/Info';

export default ({ data }) => {
  const content = data.markdownRemark;
  return (
    <Layout>
      <div className="blog-wrapper">
        <section className="category-intro">
          <h1>{content.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.frontmatter.body }} />
        </section>

        <div className="blog-first">
          {data.allMarkdownRemark.edges.map((node, index) => {
            let listingFluid =
              node.node.frontmatter.listing_image.childImageSharp.fluid;
            return (
              <a
                key={index}
                href={node.node.frontmatter.path}
                className="blog-link"
              >
                <article key={index} className="post">
                  <Img fluid={listingFluid} />
                  <div className="post-content">
                    <h2>{node.node.frontmatter.title}</h2>
                    <span className="blog-info">
                      {node.node.frontmatter.post_date} |{' '}
                      {node.node.frontmatter.category}
                    </span>
                  </div>
                </article>
              </a>
            );
          })}
        </div>
        <section className="blog-container">
          <div className="blog-list">
            {data.all.edges.map((node, index) => {
              let listingFluid =
                node.node.frontmatter.listing_image.childImageSharp.fluid;
              return (
                <a
                  key={index}
                  href={node.node.frontmatter.path}
                  className="blog-link"
                >
                  <article key={index} className="post">
                    <Img fluid={listingFluid} />
                    <div className="post-content">
                      <h2>{node.node.frontmatter.title}</h2>
                      <span className="blog-info">
                        {node.node.frontmatter.post_date} |{' '}
                        {node.node.frontmatter.category}
                      </span>
                    </div>
                  </article>
                </a>
              );
            })}
          </div>
          <aside className="sidebar">
            <Info />
          </aside>
        </section>
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
      sort: { fields: frontmatter___post_date, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            title
            path
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
    all: allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "blog-post" }, category: { in: $category } }
      }
      sort: { fields: frontmatter___post_date, order: DESC }
      skip: 1
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            post_date(formatString: "DD.MM.YYYY")
            category
            listing_image {
              childImageSharp {
                fluid(maxWidth: 945) {
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
