import React, { useEffect } from "react";
import postStyles from "../templates/post.module.scss";
import { addExtraFormatting } from "./post";
import { navigate } from "gatsby";
import Layout from '../components/layout';

export default ({ pageContext: { redirectTo } }) => {
  useEffect(() => {
    navigate(redirectTo, { replace: true });
  }, []);
  return <Layout></Layout>
};
