import Image from "next/image";
import styles from "./single-post.module.css";
import Link from "next/link";
import { PostEntry } from "../data/contentful";
import { FC, useMemo } from "react";
import { formatDate } from "../data/format-date";

interface SinglePostProps {
  entry: PostEntry;
}

interface SeparatorProps {
  index: number;
  max: number;
}

import separator0 from "./grid-item/arrow_0.png";
import separator1 from "./grid-item/arrow_1.png";
import separator2 from "./grid-item/arrow_2.png";
import separator3 from "./grid-item/arrow_3.png";
import separatorFinal from "./grid-item/arrow_final.png";

const separators = [separator0, separator1, separator2, separator3];

const Separator: FC<SeparatorProps> = ({ index, max }) => {
  const style = useMemo(() => {
    const img =
      index === max ? separatorFinal : separators[index % separators.length];
    return {
      backgroundImage: `url(${img.src})`,
    };
  }, [index, max]);

  return <div className={styles.separator} style={style} />;
};

export const SinglePost: FC<SinglePostProps> = ({ entry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.meta}>
        <h1>{entry.title}</h1>
        <p className={styles.createdAt}>{formatDate(entry.createdAt)}</p>
        <p className={styles.description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem ex
          tenetur sint rem esse quos deleniti, qui, optio aliquid id
        </p>
      </div>

      {entry.images.map((image, ind) => (
        <div key={image.id} className={styles.imageWrapper}>
          <Image
            src={"https:" + image.url}
            alt={entry.title}
            width={image.width}
            height={image.height}
            className={styles.image}
          />
          <Separator index={ind} max={entry.images.length - 1} />
        </div>
      ))}
    </div>
  );
};
