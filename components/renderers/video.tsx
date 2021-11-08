import { FC, useState } from "react";
import { PostImage } from "../../data/contentful";
import styles from "./video.module.css";

interface VideoRendererProps {
  image: PostImage;
}
export const VideoRenderer: FC<VideoRendererProps> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleCanPlayThrough = () => {
    setIsLoading(false);
  };
  return (
    <video
      data-src={"https:" + image.url}
      className={
        isLoading
          ? `${styles.video} ${styles.videoLoading} is-lazy`
          : styles.video
      }
      muted
      autoPlay
      loop
      playsInline
      onCanPlayThrough={handleCanPlayThrough}
    />
  );
};
