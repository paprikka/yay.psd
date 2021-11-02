import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { PageContainer } from "../../components/page-container";
import {
  PostEntry,
  getSingleEntryPage,
  getAllPostIds,
} from "../../data/contentful";
import Image from "next/image";
interface PostPageProps {
  entry: PostEntry;
}
const PostPage: NextPage<PostPageProps> = ({ entry }) => (
  <PageContainer>
    <div>
      {entry.images.map((image) => (
        <Image
          key={image.id}
          src={"https:" + image.url}
          alt={entry.title}
          width={image.width}
          height={image.height}
        />
      ))}
    </div>
  </PageContainer>
);

export const getStaticProps: GetStaticProps<PostPageProps, { id: string }> =
  async (context) => {
    if (!context.params?.id)
      return {
        notFound: true,
      };

    return {
      props: {
        entry: await getSingleEntryPage(context.params?.id!),
      },
    };
  };

export const getStaticPaths: GetStaticPaths = () =>
  getAllPostIds().then((ids) => ({
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false,
  }));

export default PostPage;
