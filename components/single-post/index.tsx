import styles from "./index.module.css";
import { PostEntry } from "../../data/contentful";
import { FC } from "react";
import { formatDate } from "../../data/format-date";

import { Separator } from "./separator";
import { AssetRenderer } from "../renderers/asset";
import { BottomNavLink } from "./bottom-nav-link";

interface SinglePostProps {
  entry: PostEntry;
  allPostIds: string[];
}

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
        <h1>{entry.title}</h1>
        <p className={styles.createdAt}>{formatDate(entry.publishedAt)}</p>
        {entry.description ? (
          <p className={styles.description}>{entry.description}</p>
        ) : null}
      </div>

      {entry.images.map((image, ind) => (
        <div key={image.id} className={styles.imageWrapper}>
          <AssetRenderer entry={entry} image={image} />
          <Separator index={ind} max={entry.images.length - 1} />
        </div>
      ))}
      <div className={styles.nav}>
        <BottomNavLink
          to={`/p/${previousPostId}`}
          isDisabled={!previousPostId}
          type="prev"
        />
        <BottomNavLink to={`/p/${randomPostId}`} type="random" />
        <BottomNavLink
          to={`/p/${nextPostId}`}
          isDisabled={!nextPostId}
          type="next"
        />
      </div>
    </div>
  );
};
