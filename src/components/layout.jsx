import React from "react";
import layoutStyles from "./layout.module.scss";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

const ListLink = ({ to, children }) => (
  <li className={layoutStyles.link}>
    <Link to={to}>{children}</Link>
  </li>
);

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
    <div className={layoutStyles.layout}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>
      <header>
        <Link to="/" className={layoutStyles.home}>
          <h3>My awesome site</h3>
        </Link>
        <ul className={layoutStyles.links}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about">About</ListLink>
          <ListLink to="/contact">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  );
};
