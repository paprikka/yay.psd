import { FC } from "react";
import { PostEntry, PostImage } from "../../data/contentful";
import Image from "next/image";
import styles from "./image.module.css";

interface ImageRendererProps {
  entry: PostEntry;
  image: PostImage;
}
export const ImageRenderer: FC<ImageRendererProps> = ({ entry, image }) => (
  <Image
    src={"https:" + image.url}
    alt={entry.title}
    width={image.width}
    height={image.height}
    className={styles.image}
  />
);
