import * as styles from "./post.module.scss";
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Disqus } from "gatsby-plugin-disqus";
import Seo from "../components/seo";
import addExtraFormatting from "../utils/addExtraFormatting";
import moment from "moment/moment";

const Post = ({ data, location }) => {
  const post = data.markdownRemark;
  const postUrl = data.site.siteMetadata.siteUrl + location.pathname;
  const heroImage = data.file.childImageSharp.fixed;
  const disqusConfig = {
    url: postUrl,
    identifier: post.fields.slug.slice(1),
    title: post.frontmatter.title,
  };

  const formattedDate = moment(post.frontmatter.date).format("MMMM Do, YYYY");
  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        image={heroImage}
        description={post.excerpt}
      />
      <div className={styles.post}>
        <h1 id="post-title">{post.frontmatter.title}</h1>
        <p className={styles.readTimeAndDate}>
          {post.timeToRead} min read - {formattedDate}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: addExtraFormatting(post.html) }}
        ></div>
        <Disqus config={disqusConfig} />
      </div>
    </Layout>
  );
};
export default Post;

export const query = graphql`
  query ($slug: String!, $heroGlob: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      fields {
        slug
      }
      timeToRead
      frontmatter {
        title
        date
      }
      html
    }
    site {
      siteMetadata {
        siteUrl
      }
    }

    file(relativePath: { glob: $heroGlob }) {
      childImageSharp {
        fixed {
          height
          width
          src
        }
      }
    }
  }
`;
