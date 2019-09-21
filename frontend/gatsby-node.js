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
            slug: slug,
            heroGlob: `posts${slug}/hero.*`
          }
        });
      });
  }
  function createIndex() {
    createPage({
      path: "/",
      component: path.resolve("./src/pages/pages.jsx")
    });
  }
  function createRedirectForOldPosts() {
    [
      ['/manifesto', '/about'],
      ["/post/1", "/about"],
      ["/post/2", "/my-learning-path"],
      ["/post/3", "/tdd-my-hopes"],
      ["/post/4", "/hexagonal-android-pt1-intro"],
      ["/post/5", "/hexagonal-android-pt2-architecture"],
      ["/post/6", "/hexagonal-android-pt3-boundaries"],
      ["/post/7", "/open-articles"],
      ["/post/8", "/the-dto-dilemma"],
      ["/post/9", "/the-web-pt1"],
      ["/post/01", "/about"],
      ["/post/02", "/my-learning-path"],
      ["/post/03", "/tdd-my-hopes"],
      ["/post/04", "/hexagonal-android-pt1-intro"],
      ["/post/05", "/hexagonal-android-pt2-architecture"],
      ["/post/06", "/hexagonal-android-pt3-boundaries"],
      ["/post/07", "/open-articles"],
      ["/post/08", "/the-dto-dilemma"],
      ["/post/09", "/the-web-pt1"],
      ["/post/10", "/the-web-pt2"],
      ["/post/11", "/my-java-archetype"],
      ["/post/12", "/a-new-beginning"],
      ["/post/13", "/my-first-fe-kata"],
      ["/post/14", "/background-image-with-rounded-corners"],
      ["/post/15", "/static-vs-relative"]
    ].forEach(([oldPath, newPath]) => {
      createPage({
        path: oldPath,
        component: path.resolve("./src/templates/oldPostsRedirect.jsx"),
        context: {
          redirectTo: newPath
        }
      });
    });
  }

  const { createPage } = actions;
  const blogPosts = await getAllBlogPosts();
  createBlogPostsPages();
  createIndex();
  createRedirectForOldPosts();
};
