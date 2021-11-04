import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { PageContainer } from "../../components/page-container";
import {
  PostEntry,
  getSingleEntryPage,
  getAllPostIds,
} from "../../data/contentful";
import { siteConfig } from "../../data/site-config";
import { SinglePost } from "../../components/single-post";
import { PageHead } from "../../components/head";
interface PostPageProps {
  entry: PostEntry;
  allPostIds: string[];
}
const PostPage: NextPage<PostPageProps> = ({ entry, allPostIds }) => (
  <PageContainer>
    <PageHead title={`${entry.title}: ${siteConfig.title}`} />
    <SinglePost entry={entry} allPostIds={allPostIds} />
  </PageContainer>
);

export const getStaticProps: GetStaticProps<PostPageProps, { id: string }> =
  async (context) => {
    if (!context.params?.id)
      return {
        notFound: true,
      };

    const entry = await getSingleEntryPage(context.params?.id!);
    const allPostIds = await getAllPostIds();

    return {
      props: {
        entry,
        allPostIds,
      },
    };
  };

export const getStaticPaths: GetStaticPaths = () =>
  getAllPostIds().then((ids) => ({
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false,
  }));

export default PostPage;
