import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Button from "../button";
import styles from "./about-me.module.scss";

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
      <Link to="about#my-short-story">
        <Img
          className={styles.profilePicture}
          fixed={data.file.childImageSharp.fixed}
        />
      </Link>
      <p dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <Button to="about#my-short-story" className={styles.readMore} size="s">
        Read More
      </Button>
    </div>
  );
};
