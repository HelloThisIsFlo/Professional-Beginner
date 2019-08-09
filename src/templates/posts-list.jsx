import React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import styles from "./posts-list.module.scss";

export default ({ data, pageContext }) => {
  console.log(data);
  console.log(pageContext);
  const posts = data.allMarkdownRemark.edges.map(({ node }) => node);

  const isFirstPage = pageContext.currentPage === 1;
  const isSecondPage = pageContext.currentPage === 2;
  const isLastPage = pageContext.currentPage === pageContext.numPages;

  const previousPageLink = isFirstPage ? (
    <div></div>
  ) : isSecondPage ? (
    <Link to={"/"}>{"< Newer posts"}</Link>
  ) : (
    <Link to={`/page/${pageContext.currentPage - 1}`}>{"< Newer posts"}</Link>
  );
  const nextPageLink = isLastPage ? (
    <div></div>
  ) : (
    <Link to={`/page/${pageContext.currentPage + 1}`}>{"Older posts >"}</Link>
  );

  return (
    <Layout>
      <h1>Welcome to page {pageContext.currentPage}</h1>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.fields.slug}>
            <Link to={post.fields.slug}>
              <h3>{post.frontmatter.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.pageNavigation}>
        {previousPageLink}
        {nextPageLink}
      </div>
    </Layout>
  );
};

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/blog/posts/**/index.md" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          excerpt
        }
      }
    }
  }
`;
