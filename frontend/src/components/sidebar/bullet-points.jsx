import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Button from "../button";
import * as styles from "./bullet-points.module.scss";

export default () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { title: { eq: "Bullet Points" } }) {
        html
      }
    }
  `);

  return (
    <div>
      <div
        className={styles.bulletPoints}
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      ></div>
      <div className={styles.readMore}>
        <Button to="/about" size="s">
          Read More
        </Button>
      </div>
    </div>
  );
};
