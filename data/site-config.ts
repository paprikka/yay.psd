import socialDefaultImg from "./social-default.jpg";
export interface SiteConfigImage {
  absoluteUrl: string;
  width: number;
  height: number;
}

export type SiteConfig = {
  name: string;
  domain: string;
  author: string;
  title: string;
  description: string;
  url: string;
  twitterSite: string;
  twitterCreator: string;
  socialImage: SiteConfigImage;
};

export const siteConfig: SiteConfig = {
  name: "Important Meeting Notes",
  domain: "potato.horse",
  author: "Rafal Pastuszak",
  title: "Important Meeting Notes",
  url: "https://potato.horse",
  description: "Doodles and visual storytelling by Rafal Pastuszak",
  socialImage: {
    absoluteUrl: "https://potato.horse" + socialDefaultImg.src,
    height: socialDefaultImg.height,
    width: socialDefaultImg.width,
  },
  twitterCreator: "@rafalpast",
  twitterSite: "@yay_psd",
};
