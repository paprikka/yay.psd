import Image from "next/image";
import styles from "./single-post.module.css";
import Link from "next/link";
import { PostEntry } from "../data/contentful";
import { FC, ReactNode, useMemo } from "react";
import { formatDate } from "../data/format-date";

interface SinglePostProps {
  entry: PostEntry;
  allPostIds: string[];
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

interface BottomNavLinkProps {
  to: string;
  isDisabled?: boolean;
  type: "next" | "prev" | "random";
}

const BottomNavLink: FC<BottomNavLinkProps> = ({ to, isDisabled, type }) => {
  let variantClass = "";
  if (type === "next") variantClass = styles.navLinkNext;
  if (type === "prev") variantClass = styles.navLinkPrev;
  if (type === "random") variantClass = styles.navLinkRandom;

  if (isDisabled)
    return (
      <span
        className={`${styles.navLinkDisabled} ${variantClass}`}
        role="img"
        aria-label={type}
      />
    );
  return (
    <Link href={to}>
      <a
        className={`${styles.navLink} ${variantClass}`}
        role="img"
        aria-label={type}
      />
    </Link>
  );
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
        <h1>{entry.title}</h1>
        <p className={styles.createdAt}>{formatDate(entry.createdAt)}</p>
        {entry.description ? (
          <p className={styles.description}>{entry.description}</p>
        ) : null}
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
