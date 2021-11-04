import Head from "next/head";
import { FC } from "react";
import { SiteConfig, siteConfig } from "../data/site-config";

interface PageHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

const defaults: PageHeadProps = {
  title: siteConfig.title,
  description: siteConfig.description,
};

interface OGMetaProps {
  siteConfig: SiteConfig;
}

const renderOGMeta = ({ siteConfig }: OGMetaProps) => {
  const socialImageUrl = siteConfig.url + siteConfig.image;
  return (
    <>
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:title" content={siteConfig.title} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:url" content={siteConfig.url} />
      <meta property="og:image" content={socialImageUrl} />
      <meta
        property="og:image:width"
        content={siteConfig.imageWidth.toString(10)}
      />
      <meta
        property="og:image:height"
        content={siteConfig.imageHeight.toString(10)}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterSite} />
      <meta name="twitter:creator" content={siteConfig.twitterCreator} />
      <meta name="twitter:title" content={siteConfig.title} />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta name="twitter:description" content={siteConfig.description} />
      <div>asdada</div>
    </>
  );
};

export const PageHead: FC<PageHeadProps> = (overrides) => {
  const { description, title } = { ...defaults, ...overrides };
  return (
    <Head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/png" href="favicon.png" />
      <link rel="icon" id="favicon" type="image/png" href="favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {renderOGMeta({ siteConfig })}
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
