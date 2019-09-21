module.exports = {
  siteMetadata: {
    title: "Professional Beginner",
    description:
      'My name is Florian Kempenich, and I am the Professional Beginner. I apply the "Beginner\'s Mind" to the world of Software and share on this blog what I learn throughout my Journey',
    author: "Florian Kempenich",
    twitterUsername: "ThisIsFlorianK",
    siteUrl: "https://professionalbeginner.com",
    keywords: [
      "software",
      "crafting",
      "TDD",
      "testing",
      "code",
      "developer",
      "learning",
      "Florian Kempenich"
    ],
    config: {
      postsPerPage: 6
    }
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt_separator: `<!--end-->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 650,
              showCaptions: true,
              quality: 90,
              withWebp: true
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: "±",
              prompt: {
                user: "floriankempenich",
                host: "localhost",
                global: false
              }
            }
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`
        ]
      }
    },
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
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaultQuality: 100
      }
    },
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/pages/*`] }
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `professionalbeginner`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ["/post/*", `/debug/*`, `/manifesto`]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-61995895-2",
        anonymize: true,
        exclude: ["/post/*", `/debug/*`, `/manifesto`]
      }
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/debug"]
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-feed-generator",
      options: {
        generator: `GatsbyJS`,
        rss: false,
        json: true,
        siteQuery: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              author
            }
          }
        }
      `,
        feeds: [
          {
            name: "allPosts", // This determines the name of your feed file => feed.json & feed.xml
            query: `
            {
              allMarkdownRemark(
                filter: { fileAbsolutePath: { glob: "**/posts/**/index.md" } }
                sort: { fields: frontmatter___date, order: DESC },
                limit: 100
              ) {
                edges {
                  node {
                    excerpt
                    fields {
                      slug
                    }
                    timeToRead
                    html
                    frontmatter {
                      title
                      tags
                      date
                    }
                  }
                }
              }
            }
            `,
            normalize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return {
                  title: edge.node.frontmatter.title,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  html: edge.node.html,
                  description: edge.node.excerpt
                };
              });
            }
          }
        ]
      }
    }
  ]
};
