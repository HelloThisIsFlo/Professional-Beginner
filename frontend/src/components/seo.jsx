import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

/*
'image' format: {src, height, width}
*/

export default ({ title, description, image }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author
          description
          siteUrl
          title
          keywords
        }
      }
    }
  `);

  const siteMetadata = data.site.siteMetadata;

  title = title || siteMetadata.title;
  description = description || siteMetadata.description;
  const imageSrcAbsolute =
    image && image.src ? `${siteMetadata.siteUrl}${image.src}` : "";
  console.log("imageSrcAbsolute :", imageSrcAbsolute);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />

      <meta name="twitter:creator" content={siteMetadata.author} />

      <meta name="keywords" content={siteMetadata.keywords.join(",")} />

      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="og:description" content={description} />

      {image ? (
        [
          <meta property="og:image" content={imageSrcAbsolute} />,
          <meta property="og:image:width" content={image.width} />,
          <meta property="og:image:height" content={image.height} />,
          <meta name="twitter:card" content="summary_large_image" />
        ]
      ) : (
        <meta name="twitter:card" content="summary" />
      )}
    </Helmet>
  );
};
