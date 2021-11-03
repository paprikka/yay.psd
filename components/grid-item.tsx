import Image from "next/image";
import styles from "./grid-item.module.css";
import Link from "next/link";
import { PostEntry } from "../data/contentful";
import { FC } from "react";
import { formatDate } from "../data/format-date";
interface GridItemProps {
  entry: PostEntry;
}

export const GridItem: FC<GridItemProps> = ({ entry }) => {
  return (
    <Link href={`/p/${entry.id}`}>
      <a className={styles.container}>
        <figure className={styles.imageWrapper}>
          <Image
            src={"https:" + entry.images[0].url}
            alt={entry.title}
            width={entry.images[0].width}
            height={entry.images[0].height}
          />
          <figcaption className={styles.caption}>
            <span className={styles.title}>{entry.title}</span>
            <span className={styles.createdAt}>
              {formatDate(entry.publishedAt)}
            </span>
          </figcaption>
        </figure>
      </a>
    </Link>
  );
};
