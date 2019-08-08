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
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Professional Beginner",
        short_name: "PB",
        start_url: "/",
        background_color: "#FFFCF5",
        theme_color: "#A59E94",
        // Enaables the "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png"
      }
    },
    `gatsby-plugin-offline`
  ]
};
