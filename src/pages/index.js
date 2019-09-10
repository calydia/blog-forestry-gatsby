import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import Info from '../components/Info';

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome to my blog! | Blog - Sanna Mäkinen</title>
        <meta name="Description" content="Posts about cats, life and tech." />
        <meta
          property="og:description"
          content="Posts about cats, life and tech."
        />
        <meta property="og:title" content="Welcome to my blog!" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Blog - Sanna Mäkinen" />
        <meta property="og:image" content="/static/osiris.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <div className="blog-wrapper">
        <section className="front-intro">
          <h1>Welcome to my blog!</h1>
          <p></p>
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
        <section className="front-blog-container">
          <div className="front-blog-list">
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
        </section>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog-post" } } }
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
      filter: { frontmatter: { type: { eq: "blog-post" } } }
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
                fluid(maxWidth: 450) {
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
