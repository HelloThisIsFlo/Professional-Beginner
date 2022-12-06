import React, { useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/layout";

export default ({ pageContext: { redirectTo } }) => {
  useEffect(() => {
    navigate(redirectTo, { replace: true });
  }, []);
  return <Layout></Layout>;
};
