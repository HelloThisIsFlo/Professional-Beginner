import React from "react";
import Layout from "../components/layout";
import styles from "./dynamic-pagination.module.scss";
import { graphql, Link } from "gatsby";
import Paginator, { PostWithDate } from "../utils/paginator";

const PostEntry = ({ post }) => (
  <li key={post.fields.slug}>
    <Link to={post.fields.slug}>
      <h3>{post.frontmatter.title}</h3>
      {/* <p>{post.excerpt}</p> */}
    </Link>
  </li>
);

export default ({ location, data }) => {
  function buildPaginator(posts) {
    const postsPerPage = data.site.siteMetadata.config.postsPerPage;
    const now = new Date();
    const postsWithDate = posts.map(
      post => new PostWithDate(post, new Date(post.frontmatter.date))
    );
    return new Paginator(postsPerPage, now, postsWithDate);
  }

  const currentPage = (location.state && location.state.pageNum) || 1;
  const posts = data.allMarkdownRemark.edges.map(({ node }) => node);

  const paginator = buildPaginator(posts);
  const postsOnCurrentPage = paginator.getPage(currentPage);

  const isFirstPage = currentPage === 1;
  const isSecondPage = currentPage === 2;
  const isLastPage = currentPage === paginator.numberOfPages();

  const previousPageLink = isFirstPage ? (
    <div></div>
  ) : isSecondPage ? (
    <Link to={"/dynamic-pagination/"} state={{ pageNum: 1 }}>
      {"< Newer posts"}
    </Link>
  ) : (
    <Link
      to={`/dynamic-pagination/page/${currentPage - 1}`}
      state={{ pageNum: currentPage - 1 }}
    >
      {"< Newer posts"}
    </Link>
  );

  const nextPageLink = isLastPage ? (
    <div></div>
  ) : (
    <Link
      to={`/dynamic-pagination/page/${currentPage + 1}`}
      state={{ pageNum: currentPage + 1 }}
    >
      {"Older posts >"}
    </Link>
  );

  return (
    <Layout>
      <h1>Dynamic Pagination</h1>
      <h2>Current Page: {currentPage}</h2>
      <hr />
      <h2>Blog Posts</h2>
      <ul>
        {postsOnCurrentPage.map(post => (
          <PostEntry post={post} />
        ))}
      </ul>
      <div className={styles.pageNavigation}>
        {previousPageLink}
        {nextPageLink}
      </div>
    </Layout>
  );
};

export const allBlogPostsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        config {
          postsPerPage
        }
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/blog/posts/**/index.md" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;
