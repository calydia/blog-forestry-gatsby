import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Layout from '../components/Layout';

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
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

      <main className="blog-wrapper">
        <section className="front-intro">
          <h1 id="skip-target">Welcome to my blog!</h1>
          <p></p>
        </section>

        <div className="blog-first">
          {data.allMarkdownRemark.edges.map((node, index) => {
            let listingFluid =
              node.node.frontmatter.listing_image.childImageSharp.fluid;
            return (
              <a key={index} className="post" href={node.node.frontmatter.path}>
                <Img fluid={listingFluid} />
                <div className="post-content">
                  <h2>
                    {node.node.frontmatter.title}
                  </h2>
                  <span className="blog-info">
                    {moment(node.node.frontmatter.post_date)
                      .local()
                      .format(`DD.MM.YYYY`)}{' '}
                    | {node.node.frontmatter.category}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        <div className="front-blog-container">
          <ul className="front-blog-list">
            {data.all.edges.map((node, index) => {
              let listingFluid =
                node.node.frontmatter.listing_image.childImageSharp.fluid;
              return (
                <li key={`list-item${index}`} className="blog-list-item">
                  <a key={index} className="post" href={node.node.frontmatter.path}>
                    <Img fluid={listingFluid} />
                    <div className="post-content">
                      <h2>
                        {node.node.frontmatter.title}
                      </h2>
                      <span className="blog-info">
                        {moment(node.node.frontmatter.post_date)
                          .local()
                          .format(`DD.MM.YYYY`)}{' '}
                        | {node.node.frontmatter.category}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
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
            post_date
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
            post_date
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
