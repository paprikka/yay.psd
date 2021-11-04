import { Author, Feed } from "feed";
import fs from "fs/promises";
import { PostEntry, PostImage } from "../data/contentful";
import { siteConfig } from "../data/site-config";

const imageToMarkup = (image: PostImage, entry: PostEntry): string => {
  const type = image.contentType.split("/")[0];
  if (type === "image") return `<img alt='${entry.title}' src='${image.url}'/>`;
  if (type === "video") return `<video src='${image.url}'/>`;
  return "";
};
const postEntryToMarkup = (entry: PostEntry) => {
  return `
        <h1>${entry.title}</h1>
        ${entry.description ? `<p>${entry.description}</p>` : ""}
        ${entry.images.map((image) => imageToMarkup(image, entry)).join("<br>")}
        <hr>
        <p>
            Thanks for reading! Feel free to check out my other works <a href='${
              siteConfig.url
            }'>here</a>. 
            <br><br>
            Also, why not <a href='https://sonnet.io/posts/hi/'> come and say hi</a>?
        </p>
        <p>
        Peace, love and pixels, <br>
        Rafal.
        </p>
    `;
};

export const generateRSSFeed = (entries: PostEntry[]) => {
  const author: Author = {
    name: siteConfig.author,
    link: "https://twitter.com/yay_psd",
  };
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    feedLinks: {
      rss3: `${siteConfig.url}/rss.xml`,
    },
    author,
    copyright: siteConfig.author,
  });

  entries.forEach((entry) => {
    feed.addItem({
      title: entry.title,
      id: `${siteConfig.url}/p/${entry.id}`,
      link: `${siteConfig.url}/p/${entry.id}`,
      description: entry.description || "",
      content: postEntryToMarkup(entry),
      author: [author],
      date: new Date(entry.publishedAt),
    });
  });

  return fs.writeFile("public/rss.xml", feed.rss2());
};
