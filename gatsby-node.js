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
  function createIndex() {
    createPage({
      path: '/',
      component: path.resolve('./src/pages/pages.jsx')
    })
  }

  const { createPage } = actions;
  const blogPosts = await getAllBlogPosts();
  createBlogPostsPages();
  createIndex();
};
