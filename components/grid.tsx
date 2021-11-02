import { FC } from "react";
import { PostEntry } from "../data/contentful";
import Image from "next/image";
import styles from "./grid.module.css";
import Link from "next/link";

interface GridProps {
  entries: PostEntry[];
}
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
              <figcaption className={styles.caption}>{entry.title}</figcaption>
            </figure>
          </a>
        </Link>
      </li>
    ))}
  </ul>
);
