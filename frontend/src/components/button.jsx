import * as styles from "./button.module.scss";
import React from "react";
import { Link } from "gatsby";

export default function Button({
  children,
  className,
  to,
  variant = "orange",
  size = "m",
  clickable = true,
}) {
  let colorClass;
  switch (variant) {
    case "orange":
      colorClass = styles.orange;
      break;

    case "teal":
      colorClass = styles.teal;
      break;

    default:
      throw new Error(
        "The only available color variants are 'orange' and 'teal'"
      );
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
      throw new Error("The only available size variants are 'm' and 's'");
  }

  return (
    <Link className={clickable ? "" : styles.notClickable} to={to}>
      <button
        className={`${styles.button} ${colorClass} ${sizeClass} ${className}`}
      >
        {children}
      </button>
    </Link>
  );
}
