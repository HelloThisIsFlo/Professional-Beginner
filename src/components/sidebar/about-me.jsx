import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Button from "../button";
import styles from './about-me.module.scss'

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

  console.log(styles);
  return (
    <div className={styles.aboutMe}>
      <h2>About me</h2>
      <Img
        className={styles.profilePicture}
        fixed={data.file.childImageSharp.fixed}
      />
      <p dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <Button className={styles.readMore} size="s">
        Read More
      </Button>
    </div>
  );
};
