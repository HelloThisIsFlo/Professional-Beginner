import React from 'react'
import styles from "./button.module.scss";

export default ({ children, variant = "orange", size = "m" }) => {
  let colorClass;
  switch (variant) {
    case "orange":
      colorClass = styles.orange;
      break;

    case "teal":
      colorClass = styles.teal;
      break;

    default:
      throw "The only available color variants are 'orange' and 'teal'";
  }

  let sizeClass;
  switch (size) {
    case "m":
      sizeClass = styles.sizeM;
      break;

    case "s":
      sizeClass = styles.sizeS;
      break;

    default:
      throw "The only available size variants are 'm' and 's'";
  }

  return (
    <button className={`${styles.button} ${colorClass} ${sizeClass}`}>
      {children}
    </button>
  );
};
