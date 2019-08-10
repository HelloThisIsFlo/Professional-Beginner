import React from "react";
import Layout from "../components/layout";
import styles from "./pages.module.scss";
import { navigate, graphql, Link } from "gatsby";
import Paginator, { PostWithDate } from "../utils/paginator";
import Img from "gatsby-image";

const PostEntry = ({ post, allHeroImgs }) => {
  const postImgNode = allHeroImgs.find(heroImg =>
    heroImg.relativePath.includes(post.fields.slug)
  );

  const postImg = postImgNode ? (
    <Img className={styles.postImg} fluid={postImgNode.childImageSharp.fluid} />
  ) : (
    <div className={styles.postImg}></div>
  );

  return (
    <li className={styles.post} key={post.fields.slug}>
      <Link to={post.fields.slug}>
        <h3>{post.frontmatter.title}</h3>
        {postImg}
        <p className={styles.postExcerpt}>{post.excerpt}</p>
      </Link>
    </li>
  );
};

export default ({ location, data }) => {
  function redirectTo404() {
    navigate("/404", { replace: true });
    return <div></div>;
  }
  function getCurrentPage() {
    const isFirstPage = /\/$/.test(location.pathname);
    const regexMatch = /\/pages\/(\d+)/.exec(location.pathname);

    if (isFirstPage) return 1;
    try {
      return parseInt(regexMatch[1]);
    } catch {
      return null;
    }
  }
  function buildPaginator(posts) {
    const postsPerPage = data.site.siteMetadata.config.postsPerPage;
    const now = new Date();
    const postsWithDate = posts.map(
      post => new PostWithDate(post, new Date(post.frontmatter.date))
    );
    return new Paginator(postsPerPage, now, postsWithDate);
  }

  const posts = data.allMarkdownRemark.edges.map(({ node }) => node);
  const allHeroImgs = data.allFile.edges.map(({ node }) => node);

  const paginator = buildPaginator(posts);
  const currentPage = getCurrentPage();
  if (
    currentPage === null ||
    currentPage > paginator.numberOfPages() ||
    currentPage <= 0
  ) {
    return redirectTo404();
  }

  const postsOnCurrentPage = paginator.getPage(currentPage);

  const isFirstPage = currentPage === 1;
  const isSecondPage = currentPage === 2;
  const isLastPage = currentPage === paginator.numberOfPages();

  const previousPageLink = isFirstPage ? (
    <div></div>
  ) : isSecondPage ? (
    <Link to={"/"}>{"< Newer posts"}</Link>
  ) : (
    <Link to={`/pages/${currentPage - 1}`}>{"< Newer posts"}</Link>
  );

  const nextPageLink = isLastPage ? (
    <div></div>
  ) : (
    <Link to={`/pages/${currentPage + 1}`}>{"Older posts >"}</Link>
  );

  return (
    <Layout>
      <h1>Dynamic Pagination</h1>
      <h2>Current Page: {currentPage}</h2>
      <hr />
      <h2>Blog Posts</h2>
      <ul className={styles.posts}>
        {postsOnCurrentPage.map(post => (
          <PostEntry post={post} allHeroImgs={allHeroImgs} />
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
      filter: { fileAbsolutePath: { glob: "**/posts/**/index.md" } }
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

    allFile(filter: { relativePath: { glob: "posts/**/hero.*" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
