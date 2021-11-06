import Head from "next/head";
import { FC } from "react";
import { siteConfig, SiteConfigImage } from "../data/site-config";
import { renderOGMeta } from "./render-og-meta";

interface PageHeadProps {
  title?: string;
  description?: string;
  socialImage?: SiteConfigImage;
  url?: string;
}

const defaults: Required<PageHeadProps> = {
  title: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
  socialImage: siteConfig.socialImage,
};

export const PageHead: FC<PageHeadProps> = (overrides) => {
  const { description, title, url, socialImage } = {
    ...defaults,
    ...overrides,
  };

  return (
    <Head>
      <meta charSet="UTF-8" />
      <link rel="icon" id="favicon" type="image/png" href="/favicon.png" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href={siteConfig.url + "/rss.xml"}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {renderOGMeta({
        description,
        siteConfig,
        socialImage,
        title,
        url,
      })}
      <title>{title}</title>
      <meta name="description" content={description} />
      <script
        async
        defer
        data-domains="www.potato.horse,potato.horse"
        data-website-id="6e55cbee-bddd-45a4-953a-2198ed2291cf"
        src="https://sonnet-events.herokuapp.com/umami.js"
      ></script>
    </Head>
  );
};
