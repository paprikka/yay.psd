import type { NextPage } from "next";
import { PageContainer } from "../components/page-container";
import styles from "./about.module.css";
import Image from "next/image";
interface PageProps {}
import headerImg from "../components/shhh.png";
import { PageHead } from "../components/head";
const Shhh: NextPage<PageProps> = () => (
  <PageContainer>
    <PageHead />
    <article className={styles.container}>
      <Image src={headerImg} alt="Rafal Pastuszak" />
      <h1 style={{ textAlign: "center" }}>Coming soon!</h1>
    </article>
  </PageContainer>
);

export const getStaticProps = async () => ({
  props: {},
});
export default Shhh;
