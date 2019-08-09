import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styles from './post.module.scss'

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div className={styles.post} dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date
      }
      html
    }
  }
`;
