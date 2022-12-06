import React from "react";
import { graphql, useStaticQuery } from "gatsby";
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
          twitterUsername
        }
      }

      file(relativePath: { eq: "profile_picture.jpeg" }) {
        childImageSharp {
          fixed {
            height
            width
            src
          }
        }
      }
    }
  `);

  const siteMetadata = data.site.siteMetadata;
  const shouldUseLargeTwitterCard = !!image;

  title = title || siteMetadata.title;
  description = description || siteMetadata.description;
  image = image || data.file.childImageSharp.fixed;

  const imageSrcAbsolute = `${siteMetadata.siteUrl}${image.src}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />

      <meta name="twitter:creator" content={siteMetadata.twitterUsername} />

      <meta name="keywords" content={siteMetadata.keywords.join(",")} />

      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="og:description" content={description} />

      <meta property="og:image" content={imageSrcAbsolute} />
      <meta property="og:image:width" content={image.width} />
      <meta property="og:image:height" content={image.height} />
      {shouldUseLargeTwitterCard ? (
        <meta name="twitter:card" content="summary_large_image" />
      ) : (
        <meta name="twitter:card" content="summary" />
      )}
    </Helmet>
  );
};
