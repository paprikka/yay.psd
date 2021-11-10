import { PostEntry } from "./contentful";
import { siteConfig } from "./site-config";

export const getEntryUrlFromId = (id: PostEntry["id"]) =>
  `${siteConfig.url}/p/${id}`;
