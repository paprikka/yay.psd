import { PostEntry } from "../contentful";
import { getEntryUrlFromId } from "../get-entry-url-from-id";

type Config = {
  id: PostEntry["id"];
  title: PostEntry["title"];
  description: PostEntry["description"];
};

export const entryToTweet = (config: Config): string => {
  const url = getEntryUrlFromId(config.id);
  const maxLength = 280;
  const urlLength = url.length;
  const textContent = config.description
    ? [config.title, config.description].join("\n\n")
    : config.title;

  const textContentTrimmed =
    textContent.length + urlLength > 280
      ? textContent.slice(0, maxLength - urlLength - 10) + "[...]"
      : textContent;
  return `${textContentTrimmed}\n\n${url}`;
};
