module.exports = {
  siteMetadata: {
    title: 'Blog',
    author: 'Sanna Mäkinen',
    description: 'A blog about cats and life and whatever comes to mind',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/',
    menuLinks: [
      {
        name: 'Work experience',
        link: '/experience',
        id: 'menu-2',
      },
      {
        name: 'Skills and tools',
        link: '/skills',
        id: 'menu-3',
      },
      {
        name: 'Education',
        link: '/education',
        id: 'menu-4',
      },
      {
        name: 'Projects',
        link: '/projects',
        id: 'menu-5',
      },
      {
        name: 'About me',
        link: '/about-me',
        id: 'menu-6',
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
              pathFields: ['main_image'],
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
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
