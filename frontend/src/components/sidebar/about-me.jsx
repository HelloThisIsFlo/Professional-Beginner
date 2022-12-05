import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Button from "../button";
import * as styles from "./about-me.module.scss";

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "profile_picture.jpeg" }) {
        childImageSharp {
          fixed(width: 190, height: 190) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      markdownRemark(frontmatter: { title: { eq: "About Me" } }) {
        html
      }
    }
  `);

  return (
    <div className={styles.aboutMe}>
      <h2>About me</h2>
      <Link to="/about">
        <Img
          className={styles.profilePicture}
          fixed={data.file.childImageSharp.fixed}
        />
      </Link>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} ></div>
      <Button to="/about" className={styles.readMore} size="s">
        Read More
      </Button>
    </div>
  );
};
