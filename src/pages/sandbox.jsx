import React from "react";
import "./sandbox.scss";
import { LoremIpsum } from "lorem-ipsum";
import { Link, useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import BulletPoints from "../components/sidebar/bullet-points";
import AboutMe from "../components/sidebar/about-me";
import Img from "gatsby-image";
import Button from '../components/button'

const lorem = new LoremIpsum();

const FakePostEntry = () => {
  const wordsInTitle = Math.floor(Math.random() * 3 + 3);
  return (
    <li className="post-entry">
      <h3>{lorem.generateWords(wordsInTitle)}</h3>
      <p>{lorem.generateParagraphs(1)}</p>
    </li>
  );
};

// const BulletPoints = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       markdownRemark(frontmatter: { title: { eq: "Bullet Points" } }) {
//         html
//       }
//     }
//   `);

//   return (
//     <div>
//       <div
//         className="bullet-points"
//         dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
//       ></div>
//       <div className="button">
//         <Button size="s">Read More</Button>
//       </div>
//     </div>
//   );
// };

export default () => {
  return (
    <Layout>
      <div className="sandbox">
        <div className="sidebar">
          <AboutMe />
        </div>
      </div>
    </Layout>
  );
};
