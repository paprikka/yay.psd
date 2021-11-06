import { FC } from "react";
import { PostEntry } from "../../data/contentful";
import { formatDate } from "../../data/format-date";
import { siteConfig } from "../../data/site-config";
import { track } from "../../tracking/track";
import { AssetRenderer } from "../renderers/asset";
import { SharingButtons } from "../sharing-buttons";
import { BottomNavLink } from "./bottom-nav-link";
import styles from "./index.module.css";
import { Separator } from "./separator";

interface SinglePostProps {
  entry: PostEntry;
  allPostIds: string[];
}

const getEntryUrl = (
  postId: string,
  scrollToContent: boolean = false,
  absolute: boolean = false
) => {
  const baseUrl = absolute ? siteConfig.url : "";
  const anchor = scrollToContent ? "#et" : "";

  return `${baseUrl}/p/${postId}${anchor}`;
};

export const SinglePost: FC<SinglePostProps> = ({ entry, allPostIds }) => {
  const entryIndex = allPostIds.findIndex((pId) => pId === entry.id);
  const previousPostId =
    entryIndex > 0 ? allPostIds[entryIndex - 1] : undefined;
  const nextPostId =
    entryIndex < allPostIds.length - 1 ? allPostIds[entryIndex + 1] : undefined;

  const otherPostIds = allPostIds.filter((pId) => pId !== entry.id);
  const randomPostId =
    otherPostIds[Math.floor(Math.random() * otherPostIds.length)];

  return (
    <div className={styles.container}>
      <div className={styles.meta}>
        <h1 id="et">{entry.title}</h1>
        <p className={styles.createdAt}>{formatDate(entry.publishedAt)}</p>
        {entry.description ? (
          <p className={styles.description}>{entry.description}</p>
        ) : null}
      </div>

      {entry.images.map((image, ind) => (
        <div key={image.id} className={styles.imageWrapper}>
          <AssetRenderer entry={entry} image={image} />
          <Separator index={ind} max={entry.images.length - 1}>
            {ind === entry.images.length - 1 ? (
              <SharingButtons postUrl={getEntryUrl(entry.id, false, true)} />
            ) : null}
          </Separator>
        </div>
      ))}
      <div className={styles.nav}>
        <BottomNavLink
          to={getEntryUrl(previousPostId || "", true)}
          isDisabled={!previousPostId}
          type="prev"
        />
        <BottomNavLink
          to={getEntryUrl(randomPostId, true)}
          type="random"
          onClick={() => track("click", "single-post", "random")}
        />
        <BottomNavLink
          to={getEntryUrl(nextPostId || "", true)}
          isDisabled={!nextPostId}
          type="next"
        />
      </div>
    </div>
  );
};
