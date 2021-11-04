import Head from "next/head";
import { FC } from "react";
import { siteConfig } from "../data/site-config";

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
  title: string;
  description: string;
  siteName: string;
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  twitterSite: string;
  twitterCreator: string;
}

const OGMeta: FC<OGMetaProps> = (props) => (
  <>
    <meta property="og:description" content={props.description} />
    <meta property="og:title" content={props.title} />
    <meta property="og:site_name" content={props.siteName} />
    <meta property="og:url" content={props.url} />
    <meta property="og:image" content={props.image} />
    <meta property="og:image:width" content={props.imageWidth.toString(10)} />
    <meta property="og:image:height" content={props.imageHeight.toString(10)} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={props.twitterSite} />
    <meta name="twitter:creator" content={props.twitterCreator} />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:image" content={props.image} />
    <meta name="twitter:description" content={props.description} />
  </>
);

export const PageHead: FC<PageHeadProps> = (overrides) => {
  const { description, title } = { ...defaults, ...overrides };
  return (
    <Head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
