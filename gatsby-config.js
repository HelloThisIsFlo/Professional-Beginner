/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require("autoprefixer")]
      }
    },
    "gatsby-plugin-sass"
  ]
  /* Your site config here */
};
