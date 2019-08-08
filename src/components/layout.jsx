import React from "react"
import layoutStyles from "./layout.module.scss"
import { Link } from "gatsby"

const ListLink = ({ to, children }) => (
  <li className={layoutStyles.link}>
    <Link to={to}>{children}</Link>
  </li>
)

export default ({ children }) => (
  <div className={layoutStyles.layout}>
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
)
