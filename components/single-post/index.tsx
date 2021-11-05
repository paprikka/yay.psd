import { FC } from "react";
import { PostEntry } from "../../data/contentful";
import { formatDate } from "../../data/format-date";
import { AssetRenderer } from "../renderers/asset";
import { SharingButtons } from "../sharing-buttons";
import { BottomNavLink } from "./bottom-nav-link";
import styles from "./index.module.css";
import { Separator } from "./separator";

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
            {ind === entry.images.length - 1 ? <SharingButtons /> : null}
          </Separator>
        </div>
      ))}
      <div className={styles.nav}>
        <BottomNavLink
          to={`/p/${previousPostId}#et`}
          isDisabled={!previousPostId}
          type="prev"
        />
        <BottomNavLink to={`/p/${randomPostId}#et`} type="random" />
        <BottomNavLink
          to={`/p/${nextPostId}#et`}
          isDisabled={!nextPostId}
          type="next"
        />
      </div>
    </div>
  );
};
