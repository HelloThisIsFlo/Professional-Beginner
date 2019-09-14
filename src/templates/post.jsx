import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styles from "./post.module.scss";
import { Disqus, CommentCount } from "gatsby-plugin-disqus";

export default ({ data, location }) => {
  const addExtraFormatting = html =>
    html.replace("---", "—").replace("...", "…");
  const post = data.markdownRemark;
  const postUrl = data.site.siteMetadata.url + location.pathname;
  const disqusConfig = {
    url: postUrl,
    identifier: post.fields.slug.slice(1),
    title: post.frontmatter.title
  };

  return (
    <Layout>
      <div className={styles.post}>
        <h1>{post.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: addExtraFormatting(post.html) }}
        ></div>
        <Disqus config={disqusConfig} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
        date
      }
      html
    }
    site {
      siteMetadata {
        url
      }
    }
  }
`;
