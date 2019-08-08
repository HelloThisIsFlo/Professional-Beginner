import React from "react";
import styles from "./sidebar.module.scss";
import AboutMe from "./sidebar/about-me";
import BulletPoints from "./sidebar/bullet-points";

export default () => {
  return (
    <aside className={styles.sidebar}>
      <BulletPoints />
      <hr className={styles.separator}/>
      <AboutMe />
    </aside>
  );
};
