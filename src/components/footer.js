import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  // const data = useStaticQuery(
  //   graphql`
  //     query MySomeLinks {
  //       allBlockContentBasic {
  //         nodes {
  //           body {
  //             value
  //           }
  //         }
  //       }
  //     }
  //   `
  // );

  return <footer className="main-footer" />
}
