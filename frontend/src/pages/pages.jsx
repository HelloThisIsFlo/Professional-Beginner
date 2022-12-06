import * as styles from "./pages.module.scss";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { graphql, Link, navigate } from "gatsby";
import Paginator, { PostWithDate } from "../utils/paginator";
import Img from "gatsby-image";
import moment from "moment";
import Button from "../components/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Seo from "../components/seo";

function PostEntry({ post, allHeroImgs }) {
  const postImgNode = allHeroImgs.find((heroImg) =>
    heroImg.relativePath.includes(post.fields.slug)
  );

  const postImg = postImgNode ? (
    <Img className={styles.postImg} fluid={postImgNode.childImageSharp.fluid} />
  ) : (
    <div className={styles.postImg}></div>
  );

  const formattedDate = moment(post.frontmatter.date).format("MMMM Do, YYYY");

  const tags = post.frontmatter.tags || [];

  return (
    <li className={styles.post}>
      <ul className={styles.tags}>
        {tags.map((tag, i) => (
          <li key={i}>
            <Button clickable={false} variant="teal" size="s" to="/">
              {tag.toUpperCase()}
            </Button>
          </li>
        ))}
      </ul>
      <Link to={post.fields.slug}>
        <h3>{post.frontmatter.title}</h3>
        <p>
          <span className={styles.timeToRead}>{post.timeToRead} min read</span>
          {" - "}
          <span className={styles.date}>{formattedDate}</span>
        </p>
        {postImg}
        <p className={styles.postExcerpt}>{post.excerpt}</p>
      </Link>
    </li>
  );
}

export default function Pages({ location, data }) {
  function buildPaginator(posts) {
    const postsPerPage = data.site.siteMetadata.config.postsPerPage;
    const now = new Date();
    const postsWithDate = posts.map(
      (post) => new PostWithDate(post, new Date(post.frontmatter.date))
    );
    return new Paginator(postsPerPage, now, postsWithDate);
  }

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [paginator, setPaginator] = useState(buildPaginator([]));
  const [paginatorBuiltWithAllPages, setPaginatorBuiltWithAllPages] =
    useState(false);

  useEffect(() => {
    console.debug("PAGES: RUNNING EFFECT 'setCurrentPage'");

    function getCurrentPage() {
      const isFirstPage = /\/$/.test(location.pathname);
      const regexMatch = /\/pages\/(\d+)/.exec(location.pathname);

      if (isFirstPage) {
        return 1;
      }
      try {
        return parseInt(regexMatch[1]);
      } catch {
        return null;
      }
    }

    setCurrentPage(getCurrentPage());
  }, [location]);

  useEffect(() => {
    console.debug("PAGES: RUNNING EFFECT 'setPosts'");
    const allPosts = data.allMarkdownRemark.edges.map(({ node }) => node);
    setPosts(allPosts);
  }, [data]);

  useEffect(() => {
    console.debug(
      "PAGES: RUNNING EFFECT 'setPaginator' and (?) 'setPaginatorBuiltWithAllPages'"
    );
    setPaginator(buildPaginator(posts));
    if (posts.length !== 0) {
      console.debug("PAGES: PAGINATOR NOW BUILT WITH ALL PAGES");
      setPaginatorBuiltWithAllPages(true);
    }
  }, [posts]);

  useEffect(() => {
    console.debug("PAGES: RUNNING EFFECT 'check if current page is valid''");
    if (!paginatorBuiltWithAllPages) {
      console.debug("PAGES: Paginator not built with all posts yet, skipping");
      return;
    }

    console.debug("PAGES: PAGINATOR BUILT WITH ALL POSTS, CHECKING");
    if (
      currentPage === null ||
      currentPage > paginator.numberOfPages() ||
      currentPage <= 0
    ) {
      console.debug("PAGES: REDIRECTING TO 404");
      navigate("/404", { replace: true });
    }
  }, [currentPage, paginatorBuiltWithAllPages, paginator]);

  console.debug("PAGES: posts.length", posts.length);
  console.debug("PAGES: currentPage", currentPage);
  console.debug("PAGES: paginator.numberOfPages()", paginator.numberOfPages());

  const allHeroImgs = data.allFile.edges.map(({ node }) => node);

  const postsOnCurrentPage = paginator.getPage(currentPage);

  const isFirstPage = currentPage === 1;
  const isSecondPage = currentPage === 2;
  const isLastPage = currentPage === paginator.numberOfPages();

  const previousPageLink = isFirstPage ? (
    <div></div>
  ) : isSecondPage ? (
    <Link className={styles.paginationLink} to="/">
      <FaAngleLeft className={styles.previous} /> {"Newer posts"}
    </Link>
  ) : (
    <Link className={styles.paginationLink} to={`/pages/${currentPage - 1}`}>
      <FaAngleLeft className={styles.previous} /> {"Newer posts"}
    </Link>
  );

  const nextPageLink = isLastPage ? (
    <div></div>
  ) : (
    <Link className={styles.paginationLink} to={`/pages/${currentPage + 1}`}>
      {"Older posts "}
      <FaAngleRight className={styles.next} />
    </Link>
  );

  return (
    <Layout>
      <Seo />
      <ul className={styles.posts}>
        {postsOnCurrentPage.map((post) => (
          <PostEntry
            post={post}
            allHeroImgs={allHeroImgs}
            key={post.fields.slug}
          />
        ))}
      </ul>
      <div className={styles.pagination}>
        {previousPageLink}
        {nextPageLink}
      </div>
    </Layout>
  );
}

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
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
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
