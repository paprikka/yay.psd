import { FC } from "react";
import { PostEntry } from "../data/contentful";
import styles from "./grid.module.css";
import { GridItem } from "./grid-item";

interface GridProps {
  entries: PostEntry[];
}

export const Grid: FC<GridProps> = ({ entries }) => (
  <ul className={styles.container}>
    {entries.map((entry) => (
      <li key={entry.id} className={styles.entry}>
        <GridItem entry={entry} />
      </li>
    ))}
  </ul>
);
