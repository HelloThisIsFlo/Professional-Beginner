import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Button from "../button";

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
        className="bullet-points"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      ></div>
      <div className="button">
        <Button size="s">Read More</Button>
      </div>
    </div>
  );
};
