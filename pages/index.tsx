import type { NextPage } from "next";
import { getPage, PostEntry } from "../data/contentful";
import { Grid } from "../components/grid";
import { PageContainer } from "../components/page-container";
interface PageProps {
  entries: PostEntry[];
}

const Home: NextPage<PageProps> = ({ entries }) => {
  return (
    <PageContainer>
      <Grid entries={entries} />
    </PageContainer>
  );
};

export const getStaticProps = async () => ({
  props: {
    entries: await getPage(),
  },
});
export default Home;
