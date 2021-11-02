import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { getPage, PostEntry } from "../data/contentful";
import { Nav } from "../components/nav";
import { Grid } from "../components/grid";
import styles from "./index.module.css";
interface PageProps {
  entries: PostEntry[];
}
const Home: NextPage<PageProps> = ({ entries }) => {
  return (
    <div className={styles.container}>
      <Nav />
      <Grid entries={entries} />
    </div>
  );
};

export const getStaticProps = async () => ({
  props: {
    entries: await getPage(),
  },
});
export default Home;
