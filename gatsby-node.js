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
  async function createBlogPostsPages() {
    const { createPage } = actions;

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

    result.data.allMarkdownRemark.edges
      .map(({ node }) => node.fields.slug)
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

  await createBlogPostsPages();
};
