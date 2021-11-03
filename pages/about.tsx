import type { NextPage } from "next";
import { PageContainer } from "../components/page-container";
import styles from "./about.module.css";
import Image from "next/image";
import Link from "next/link";
interface PageProps {}
import headerImg from "../components/about-header.png";
const About: NextPage<PageProps> = () => (
  <PageContainer>
    <article className={styles.container}>
      <Image src={headerImg} alt="Rafal Pastuszak" />
      <h1>Hi there</h1>
      <p>
        My name is Rafal Pastuszak (just like the words <em>pasta</em> and{" "}
        <em>shack</em>). I&rsquo;m a tinkerer/software engineer currently based
        in Portugal.
      </p>
      <h2>Contact</h2>
      <ul>
        <li>
          <Link href="https://sonnet.io">
            <a target="_blank">My blog</a>
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/rafalpast">
            <a target="_blank">Twitter</a>
          </Link>
        </li>
        <li>
          <Link href="https://instagram.com/yay.psd">
            <a target="_blank">Insta</a>
          </Link>
        </li>
      </ul>
    </article>
  </PageContainer>
);

export const getStaticProps = async () => ({
  props: {},
});
export default About;
