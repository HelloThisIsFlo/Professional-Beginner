import React from "react";
import Header from "../components/header";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    <Header headerText={data.site.siteMetadata.title} />
    <p>
      <Link to="/about-css-modules/">About CSS Modules</Link>
    </p>

    <p>
      <ul>
        <li>Ok, now it's working!! :D </li>
        <li>Hello</li>
        <li>Bonjour</li>
      </ul>
      <img
        style={{ borderRadius: "10px" }}
        src="https://source.unsplash.com/random/400x200"
        alt=""
      />
    </p>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
