import { FC } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import shareImg from "./button-share.png";
import followImg from "./button-follow.png";

export const SharingButtons: FC = () => {
  return (
    <div className={styles.container}>
      <button className={styles.share}>
        <Image src={shareImg} alt="Share" />
      </button>
      <button className={styles.follow}>
        <Image src={followImg} alt="Follow" />
      </button>
    </div>
  );
};
