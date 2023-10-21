import React from "react";
import { Helmet } from "react-helmet-async";

export default function Titles({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Titles.defaultProps = {
  title: "Welcome to Kampala",
  description: "Buy more,pay less at Kampala",
  keywords: "Everything gadgets",
};
