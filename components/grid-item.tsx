import Image from "next/image";
import styles from "./grid-item.module.css";
import Link from "next/link";
import { PostEntry } from "../data/contentful";
import { FC } from "react";
import { formatDate } from "../data/format-date";
interface GridItemProps {
  entry: PostEntry;
  onClick: (entry: PostEntry) => void;
}

import placeholderImg from "./placeholder.png";
import { AssetRenderer } from "./renderers/asset";
import { track } from "../tracking/track";

export const GridItem: FC<GridItemProps> = ({ entry }) => {
  const cover = entry.images[0];
  return (
    <Link href={`/p/${entry.id}`}>
      <a
        className={styles.container}
        onClick={() => track("click", "all-posts", entry.slug || "(no-slug)")}
      >
        <div className={styles.imageWrapper}>
          {cover ? (
            <AssetRenderer entry={entry} image={cover} />
          ) : (
            <Image
              src={placeholderImg}
              alt={entry.title}
              width={800}
              height={800}
            />
          )}

          <div className={styles.caption}>
            <span className={styles.title}>{entry.title}</span>
            <span className={styles.createdAt}>
              {formatDate(entry.publishedAt)}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};
