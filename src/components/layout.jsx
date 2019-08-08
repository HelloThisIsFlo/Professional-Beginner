import React from "react";
import styles from "./layout.module.scss";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

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
        <title>{data.site.siteMetadata.title}</title>
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
      <aside className={styles.sidebar}>SIDEBAR</aside>
    </div>
  );
};
