import React from "react";
import "./sandbox.scss";
import { LoremIpsum } from "lorem-ipsum";
import Layout from "../../components/layout";
import Button from "../../components/button";

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

export const Header = ({ children }) => <h1>{children}</h1>;

export default () => {
  return (
    <Layout>
      <div className="sandbox">
        <div className="tags">
          <Button variant="teal" size="s">
            HTML / CSS
          </Button>
          <Button variant="teal" size="s">
            TDD
          </Button>
          <Button variant="teal" size="s">
            ARCHITECTURE
          </Button>
          <Button variant="teal" size="s">
            FEATURED
          </Button>
        </div>
      </div>
    </Layout>
  );
};
