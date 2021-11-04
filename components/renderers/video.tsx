import { FC } from "react";
import { PostImage } from "../../data/contentful";
import styles from "./video.module.css";

interface VideoRendererProps {
  image: PostImage;
}
export const VideoRenderer: FC<VideoRendererProps> = ({ image }) => (
  <video
    src={"https:" + image.url}
    className={styles.video}
    muted
    autoPlay
    loop
    playsInline
  />
);
