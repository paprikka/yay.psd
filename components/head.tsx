import Head from "next/head";
import { FC } from "react";
import { SiteConfig, siteConfig, SiteConfigImage } from "../data/site-config";

interface PageHeadProps {
  title?: string;
  description?: string;
  socialImage?: SiteConfigImage | null;
}

const defaults: PageHeadProps = {
  title: siteConfig.title,
  description: siteConfig.description,
};

interface OGMetaProps {
  siteConfig: SiteConfig;
  socialImage: SiteConfigImage | null;
}

const renderOGMeta = ({ siteConfig, socialImage }: OGMetaProps) => {
  const selectedSocialImage: SiteConfigImage =
    socialImage || siteConfig.socialImage;

  return (
    <>
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:title" content={siteConfig.title} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:url" content={siteConfig.url} />
      <meta property="og:image" content={selectedSocialImage.absoluteUrl} />
      <meta
        property="og:image:width"
        content={selectedSocialImage.width.toString(10)}
      />
      <meta
        property="og:image:height"
        content={selectedSocialImage.height.toString(10)}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterSite} />
      <meta name="twitter:creator" content={siteConfig.twitterCreator} />
      <meta name="twitter:title" content={siteConfig.title} />
      <meta name="twitter:image" content={selectedSocialImage.absoluteUrl} />
      <meta name="twitter:description" content={siteConfig.description} />
    </>
  );
};

export const PageHead: FC<PageHeadProps> = (overrides) => {
  const { description, title } = { ...defaults, ...overrides };
  const socialImage = overrides.socialImage || null;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/png" href="favicon.png" />
      <link rel="icon" id="favicon" type="image/png" href="favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {renderOGMeta({ siteConfig, socialImage })}
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
