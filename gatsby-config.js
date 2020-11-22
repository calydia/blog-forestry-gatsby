module.exports = {
  siteMetadata: {
    title: 'Blog',
    author: 'Sanna Mäkinen',
    description: 'A blog about cats and life and whatever comes to mind',
    siteUrl: 'https://blog.sanna.ninja',
    menuLinks: [
      {
        name: 'Cats',
        link: '/cats',
        id: 'menu-2',
      },
      {
        name: 'Life',
        link: '/life',
        id: 'menu-3',
      },
      {
        name: 'Tech',
        link: '/tech',
        id: 'menu-4',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-responsive-image`,
            options: {
              maxWidth: 1500,
            },
          },
          {
            resolve: 'gatsby-remark-normalize-paths',
            options: {
              pathFields: ['main_image', 'listing_image', 'profile_image'],
            },
          },
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1500,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/uploads`,
        name: `uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'content',
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Rock Salt`,
          `Average Sans:400, 700`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-53GM7Z7',

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/cats`, `/life`, `/tech`, `/about-me`, `/about`],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.meta_description,
                  date: edge.node.frontmatter.post_date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                });
              });
            },
            query: `
            {
              allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___post_date]}, filter: {frontmatter: {type: {eq: "blog-post"}}}) {
                edges {
                  node {
                    frontmatter {
                      title
                      post_date(formatString: "DD.MM.YYYY")
                      meta_description
                      path
                    }
                  }
                }
              }
            }
            
            `,
            output: '/rss.xml',
            title: "Blog - Sanna Mäkinen's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://blog.sanna.ninja',
        sitemap: 'https://blog.sanna.ninja/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    `gatsby-plugin-netlify`,
  ],
};
