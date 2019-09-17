import React from "react";
import Layout from "../components/layout";
import postStyles from "../templates/post.module.scss";
import { addExtraFormatting } from "./post";
import { navigate } from "gatsby";

export default ({ pageContext: { redirectTo } }) => {
  navigate(redirectTo, { replace: true });
  return <div></div>;
};
