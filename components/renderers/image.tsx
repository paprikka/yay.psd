import { FC, useState } from "react";
import { PostEntry, PostImage } from "../../data/contentful";
import Image from "next/image";
import styles from "./image.module.css";

interface ImageRendererProps {
  entry: PostEntry;
  image: PostImage;
}

export const ImageRenderer: FC<ImageRendererProps> = ({ entry, image }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={"https:" + image.url}
      alt={entry.title}
      width={image.width}
      height={image.height}
      className={
        isLoading ? `${styles.image} ${styles.imageLoading}` : styles.image
      }
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};
