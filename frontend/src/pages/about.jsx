import React from "react";
import Layout from "../components/layout";
import postStyles from "../templates/post.module.scss";
import { addExtraFormatting } from "../templates/post";
import { graphql  } from "gatsby";

export default ({ data }) => {
  const about = data.markdownRemark;
  return (
    <Layout>
      <div className={postStyles.post}>
        <div
          dangerouslySetInnerHTML={{ __html: addExtraFormatting(about.html) }}
        ></div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { glob: "**/about.md" }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
