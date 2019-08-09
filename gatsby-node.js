const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  const isMarkdownNode = node.internal.type === `MarkdownRemark`;
  const isBlogPost =
    isMarkdownNode && node.fileAbsolutePath.includes("blog/posts");

  if (isBlogPost) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "posts/",
      trailingSlash: false
    });

    createNodeField({
      node,
      name: "slug",
      value: slug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  async function getAllBlogPosts() {
    const result = await graphql(`
      query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/blog/posts/**/index.md" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `);

    return result.data.allMarkdownRemark.edges.map(({ node }) => node);
  }

  async function getConfig() {
    const result = await graphql(`
      query {
        site {
          siteMetadata {
            config {
              postsPerPage
            }
          }
        }
      }
    `);

    return result.data.site.siteMetadata.config;
  }

  function createBlogPostsPages() {
    blogPosts
      .map(post => post.fields.slug)
      .forEach(slug => {
        createPage({
          path: slug,
          component: path.resolve("./src/templates/post.jsx"),
          context: {
            slug: slug
          }
        });
      });
  }

  function createBlogPostsListPages() {
    const totalNumberOfPosts = blogPosts.length;
    const postsPerPage = config.postsPerPage;

    const numPages = Math.ceil(totalNumberOfPosts / postsPerPage);
    for (let i = 0; i < numPages; i++) {
      createPage({
        path: i === 0 ? "/" : `/page/${i + 1}`,
        component: path.resolve("./src/templates/posts-list.jsx"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      });
    }
  }

  const { createPage, createRedirect } = actions;
  const config = await getConfig();
  const blogPosts = await getAllBlogPosts();
  createBlogPostsPages();
  createBlogPostsListPages();
};
