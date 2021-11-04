import socialDefaultImg from "./social-default.jpg";
export interface SiteConfig {
  name: string;
  domain: string;
  author: string;
  title: string;
  description: string;
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  twitterSite: string;
  twitterCreator: string;
}

export const siteConfig: SiteConfig = {
  name: "Important Meeting Notes",
  domain: "potato.horse",
  author: "Rafal Pastuszak",
  title: "Important Meeting Notes",
  url: "https://potato.horse",
  description: "Doodles and visual storytelling by Rafal Pastuszak",
  image: socialDefaultImg.src,
  imageHeight: socialDefaultImg.height,
  imageWidth: socialDefaultImg.width,
  twitterCreator: "@rafalpast",
  twitterSite: "@yay_psd",
};
