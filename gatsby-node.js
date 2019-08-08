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
