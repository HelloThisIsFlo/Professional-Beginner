import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const CurrentSecondsCounter = () => {
  const getCurrentSeconds = () => new Date().getSeconds();

  const [secondWhenPageLoaded, _] = useState(getCurrentSeconds());
  const [currentSeconds, setCurrentSeconds] = useState(secondWhenPageLoaded);

  useEffect(() => {
    const updateEverySecond = setInterval(() => {
      setCurrentSeconds(getCurrentSeconds());
    }, 1000);
    return () => {
      clearInterval(updateEverySecond);
    };
  }, []); // Pass [] to run the effect only once, not every render

  return (
    <div>
      <h3>Seconds</h3>
      <table>
        <tr>
          <th>When page loaded:</th>
          <td>{secondWhenPageLoaded}</td>
        </tr>
        <tr>
          <th>Currently: </th>
          <td>{currentSeconds}</td>
        </tr>
      </table>
    </div>
  );
};

export default ({ data }) => {
  const blogPosts = data.allMarkdownRemark.edges.map(({ node }) => node);
  const blogPosts3Times = [...blogPosts, ...blogPosts, ...blogPosts];

  return (
    <Layout>
      <p>
        <Link to="/about-css-modules/">About CSS Modules</Link>
      </p>
      <h2>Dynamic content</h2>
      <CurrentSecondsCounter />
      <p>
        <Link to="/sandbox">Sandbox</Link>
      </p>

      <img
        style={{ borderRadius: "10px" }}
        src="https://source.unsplash.com/random/400x200"
        alt=""
      />

      <hr />
      <div className="blog-posts">
        <h2>Blog Posts</h2>
        <ul>
          {blogPosts3Times.map(node => (
            <li>
              <Link to={node.fields.slug}>
                <h3>{node.frontmatter.title}</h3>
                <p>{node.excerpt}</p>
                <pre>{node.fields.slug}</pre>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
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
          }
        }
      }
    }
  }
`;
