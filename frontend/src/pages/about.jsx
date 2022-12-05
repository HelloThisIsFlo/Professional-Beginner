import * as postStyles from "../templates/post.module.scss";
import React from "react";
import Layout from "../components/layout";
import { graphql  } from "gatsby";
import addExtraFormatting from "../utils/addExtraFormatting";

const About = ({ data }) => {
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
export default About;

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
