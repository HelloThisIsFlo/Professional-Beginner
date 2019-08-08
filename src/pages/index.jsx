import React from "react"
import Header from "../components/header"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <Header headerText="Hello Gatsby" />
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
)
