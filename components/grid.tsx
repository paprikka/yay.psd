import { FC } from "react";
import { PostEntry } from "../data/contentful";
import Image from "next/image";
import styles from "./grid.module.css";
import Link from "next/link";

interface GridProps {
  entries: PostEntry[];
}

const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
};

export const Grid: FC<GridProps> = ({ entries }) => (
  <ul className={styles.container}>
    {entries.map((entry) => (
      <li key={entry.id} className={styles.entry}>
        <Link href={`/p/${entry.id}`}>
          <a className={styles.link}>
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
                  {formatDate(entry.createdAt)}
                </span>
              </figcaption>
            </figure>
          </a>
        </Link>
      </li>
    ))}
  </ul>
);
