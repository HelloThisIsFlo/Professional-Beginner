import React from "react";
import Header from "../components/header";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => {
  const blogPosts = data.allMarkdownRemark.edges.map(({ node }) => node);
  const blogPosts3Times = [...blogPosts, ...blogPosts, ...blogPosts];
  return (
    <Layout>
      {/* <Header headerText={data.site.siteMetadata.title} /> */}
      <p>
        <Link to="/about-css-modules/">About CSS Modules</Link>
      </p>
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
