import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Layout from '../components/Layout';
import Info from '../components/Info';

export default ({ data }) => {
  const content = data.markdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>{content.frontmatter.title} | Blog - Sanna Mäkinen</title>
        <meta
          name="Description"
          content={content.frontmatter.meta_description}
        />
        <meta
          property="og:description"
          content={content.frontmatter.meta_description}
        />
        <meta property="og:title" content={content.frontmatter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Blog - Sanna Mäkinen" />
        <meta property="og:image" content="/static/osiris.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <main className="blog-wrapper">
        <section className="category-intro">
          <h1 id="skip-target">{content.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.frontmatter.body }} />
        </section>

        <div className="blog-first">
          {data.allMarkdownRemark.edges.map((node, index) => {
            let listingFluid =
              node.node.frontmatter.listing_image.childImageSharp.fluid;
            return (
              <article key={index} className="post">
                <Img fluid={listingFluid} alt="" />
                <div className="post-content">
                  <h2>
                    <a
                      key={index}
                      href={node.node.frontmatter.path}
                      className="blog-link"
                    >
                      {node.node.frontmatter.title}
                    </a>
                  </h2>
                  <span className="blog-info">
                    {moment(node.node.frontmatter.post_date)
                      .local()
                      .format(`DD.MM.YYYY`)}{' '}
                    | {node.node.frontmatter.category}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="blog-container">
          <ul className="blog-list">
            {data.all.edges.map((node, index) => {
              let listingFluid =
                node.node.frontmatter.listing_image.childImageSharp.fluid;
              return (
                <li key={`list-item${index}`} className="blog-list-item">
                  <article key={index} className="post">
                    <Img fluid={listingFluid} alt="" />
                    <div className="post-content">
                      <h2>
                        <a
                          key={index}
                          href={node.node.frontmatter.path}
                          className="blog-link"
                        >
                          {node.node.frontmatter.title}
                        </a>
                      </h2>
                      <span className="blog-info">
                        {moment(node.node.frontmatter.post_date)
                          .local()
                          .format(`DD.MM.YYYY`)}{' '}
                        | {node.node.frontmatter.category}
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          <aside className="sidebar">
            <Info />
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!, $category: [String]) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        body
        meta_description
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
            post_date
            category
            image_alt_text
            listing_image {
              childImageSharp {
                fluid(maxWidth: 1025) {
                  ...GatsbyImageSharpFluid_withWebp
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
            post_date
            category
            image_alt_text
            listing_image {
              childImageSharp {
                fluid(maxWidth: 945) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
