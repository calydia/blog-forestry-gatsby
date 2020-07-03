import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

export default ({ data }) => {
  const post = data.markdownRemark;
  let mainFluid = post.frontmatter.main_image.childImageSharp.fluid;
  return (
    <Layout>
      <Helmet>
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
        <link
          rel="canonical"
          href={`https://blog.sanna.ninja${post.frontmatter.path}`}
        />
      </Helmet>

      <main className="blog-wrapper">
        <Img fluid={mainFluid} alt={post.frontmatter.image_alt_text} />
        <div className="basic-content">
          <h1 id="skip-target">{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.frontmatter.body }} />
        </div>
      </main>
    </Layout>
  );
};
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        body
        path
        image_alt_text
        meta_description
        main_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
