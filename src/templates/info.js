import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

export default ({ data }) => {
  const post = data.markdownRemark;
  let mainFluid = post.frontmatter.profile_image.childImageSharp.fluid;
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.frontmatter.title} | Blog - Sanna Mäkinen</title>
        <meta
          name="Description"
          content="I'm a developer by profession. So basically I like to code. I love cats."
        />
        <meta
          property="og:description"
          content="I'm a developer by profession. So basically I like to code. I love cats."
        />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Blog - Sanna Mäkinen" />
        <meta property="og:image" content="/static/osiris.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <div className="blog-wrapper">
        <Img fluid={mainFluid} />
        <div className="blog-content">
          <h1>{post.frontmatter.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.frontmatter.info }} />
        </div>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        info
        image_alt_text
        profile_image {
          childImageSharp {
            fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
