import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

export default () => {
  const data = useStaticQuery(
    graphql`
      query MyInfo {
        markdownRemark(frontmatter: { type: { eq: "info" } }) {
          frontmatter {
            info
            name
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
    `
  );

  let profileImage =
    data.markdownRemark.frontmatter.profile_image.childImageSharp.fluid;

  return (
    <div className="my-info">
      <Img fluid={profileImage} />
      <div className="info-box">
        <span className="name">{data.markdownRemark.frontmatter.name}</span>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.frontmatter.info,
          }}
        />
      </div>
    </div>
  );
};
