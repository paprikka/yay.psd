import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { FC, useState } from "react";
import { track } from "../../tracking/track";
import followImg from "./button-follow.png";
import shareImg from "./button-share.png";
import styles from "./index.module.css";
import { share } from "./share";

const wait = (time: number) => () => new Promise((r) => setTimeout(r, time));

interface SharingButtonsProps {
  postUrl: string;
}

export const SharingButtons: FC<SharingButtonsProps> = ({ postUrl }) => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const router = useRouter();
  const onShareClick = () => {
    track("click", "single-post", "share");
    share(postUrl)
      .then(() => setIsToastVisible(true))
      .then(wait(3000))
      .then(() => setIsToastVisible(false));
  };

  const onFollowClick = () => {
    track("click", "single-post", "follow");
    router.push("/shhh");
  };
  return (
    <div className={styles.container}>
      <button className={styles.share} onClick={onShareClick}>
        <Image priority src={shareImg} alt="Share" />
      </button>
      <button className={styles.follow} onClick={onFollowClick}>
        <Image priority src={followImg} alt="Follow" />
      </button>

      <div
        className={
          isToastVisible
            ? `${styles.toast} ${styles.toastActive}`
            : styles.toast
        }
      >
        <div className={styles.toastContent}>URL copied to clipboard</div>
        <div className={styles.toastBackground} />
      </div>
    </div>
  );
};
