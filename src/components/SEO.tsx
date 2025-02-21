
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  canonicalUrl,
  image = '/og-image.png',
  noindex = false,
}: SEOProps) => {
  const { i18n } = useTranslation();
  const siteUrl = window.location.origin;
  const pageUrl = window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | Modelarium` : 'Modelarium - 3D Model Search Engine'}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl || pageUrl} />
      {noindex && <meta name="robots" content="noindex" />}

      {/* OpenGraph Meta Tags */}
      <meta property="og:site_name" content="Modelarium" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={i18n.language} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Language Alternates */}
      {i18n.languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${siteUrl}/${lang}${window.location.pathname}`}
        />
      ))}
    </Helmet>
  );
};
