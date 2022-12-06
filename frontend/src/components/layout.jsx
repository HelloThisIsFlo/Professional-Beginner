import React from "react";
import * as styles from "./layout.module.scss";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Sidebar from "./sidebar";

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={styles.layout}>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <header className={styles.headerContainer}>
        <div className={styles.header}>
          <Link to="/">
            <h1>{data.site.siteMetadata.title}</h1>
          </Link>
          <Link to="/about">About</Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <Sidebar />
    </div>
  );
};
