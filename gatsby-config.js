/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Professional Beginner"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require("autoprefixer")]
      }
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/blog/`
      }
    }
  ]
  /* Your site config here */
};
