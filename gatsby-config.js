module.exports = {
  siteMetadata: {
    title: 'Blog',
    author: 'Sanna Mäkinen',
    description: 'A blog about cats and life and whatever comes to mind',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/',
    menuLinks: [
      {
        name: 'About',
        link: '/about',
        id: 'menu-1',
      },
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
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Rock Salt', 'Raleway:400,700'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-NCHXMTX',

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    `gatsby-plugin-feed`,
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
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
};
