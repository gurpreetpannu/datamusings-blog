import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateMetaTags, generateStructuredData } from '../templates/postTemplate';

const SEO = ({ post }) => {
  const metaTags = generateMetaTags(post);
  const structuredData = generateStructuredData(post);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metaTags.ogTitle} />
      <meta property="og:description" content={metaTags.ogDescription} />
      <meta property="og:image" content={coverPhotoUrl || metaTags.ogImage} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={metaTags.canonicalUrl} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTags.ogTitle} />
      <meta name="twitter:description" content={metaTags.ogDescription} />
      <meta name="twitter:image" content={coverPhotoUrl || metaTags.ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaTags.canonicalUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 