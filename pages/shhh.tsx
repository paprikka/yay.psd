import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import feedImg from "../components/feed.svg";
import { PageHead } from "../components/head";
import instaImg from "../components/instagram.svg";
import { PageContainer } from "../components/page-container";
import headerImg from "../components/shhh.png";
import { Subscribe } from "../components/subscribe";
import twitterImg from "../components/twitter.svg";
import { track } from "../tracking/track";
import sharedStyles from "./about.module.css";
import styles from "./shhh.module.css";

interface PageProps {}
const Shhh: NextPage<PageProps> = () => (
  <PageContainer>
    <PageHead />
    <article className={sharedStyles.container}>
      <Image src={headerImg} alt="Rafal Pastuszak" />
      <h1 style={{ textAlign: "center" }}>Shhh... subscribe!</h1>
      <p>
        Hej, things are much friendlier outside of social media. So feel free to
        follow me directly.
      </p>
      <h3>New stories delivered straight to your inbox:</h3>
      <p className={sharedStyles.subtitle}>
        I promise no spam. I just hate ads.
      </p>
      <Subscribe />

      <h3>Alternatives:</h3>
      <div className={styles.followingOptions}>
        <div className={styles.followingOptionItem}>
          <Link href="/rss.xml">
            <a
              target="_blank"
              onClick={() => track("click", "subscribe", "rss")}
            >
              <Image
                className={styles.followingOptionsIcon}
                src={feedImg}
                alt="RSS"
              />
            </a>
          </Link>
          RSS
        </div>
        <div className={styles.followingOptionItem}>
          <Link href="https://instagram.com/yay.psd">
            <a
              rel="nofollow"
              target="_blank"
              onClick={() => track("click", "subscribe", "instagram")}
            >
              <Image
                className={styles.followingOptionsIcon}
                src={instaImg}
                alt="Instagram"
              />
            </a>
          </Link>
          Instagram
        </div>
        <div
          className={`${styles.followingOptionItem} ${styles.followingOptionItemDisabled}`}
        >
          <Link href="https://twitter.com/yay_psd">
            <a
              rel="nofollow"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                track("click", "subscribe", "twitter");
              }}
            >
              <Image
                className={styles.followingOptionsIcon}
                src={twitterImg}
                alt="Twitter"
              />
            </a>
          </Link>
          Twitter
        </div>
      </div>
    </article>
  </PageContainer>
);

export const getStaticProps = async () => ({
  props: {},
});
export default Shhh;
