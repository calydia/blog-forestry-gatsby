import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import Info from '../components/Info';

export default ({ data }) => {
  const post = data.markdownRemark;
  let mainFluid = post.frontmatter.main_image.childImageSharp.fluid;
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.frontmatter.title} | Blog - Sanna Mäkinen</title>
        <meta name="Description" content={post.frontmatter.meta_description} />
        <meta
          property="og:description"
          content={post.frontmatter.meta_description}
        />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Blog - Sanna Mäkinen" />
        <meta property="og:image" content={mainFluid.src} />
      </Helmet>

      <div className="blog-wrapper">
        <Img fluid={mainFluid} alt={post.frontmatter.image_alt_text} />
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
        image_alt_text
        meta_description
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
