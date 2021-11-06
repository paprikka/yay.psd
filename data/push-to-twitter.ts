import { PostEntry } from "./contentful";

const TWITTER_API_KEY = process.env;
const TWITTER_API_SECRET = process.env;
const TWITTER_BEARER_TOKEN = process.env;

export const pushToTwitter = (entries: PostEntry[]) => {
  //   if (!(TWITTER_API_KEY && TWITTER_API_SECRET && TWITTER_BEARER_TOKEN))
  //     return Promise.reject(new Error("Missing Twitter API config."));

  console.log("Syndicate Twitter posts");
  console.log(
    "...not yet, because Twitter keeps banning me for no fucking reason woop woop"
  );
  console.dir(entries, { depth: 5 });

  return Promise.resolve();
};
