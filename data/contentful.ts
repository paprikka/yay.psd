import { createClient, Asset, Entry } from "contentful";

interface ContentfulEntryProps {
  title: string;
  images: Asset[];
  slug: string;
  description?: string;
}

export interface PostEntry {
  id: string;
  title: string;
  slug: string;
  images: PostImage[];
  createdAt: string;
  description: string | null;
}

export interface PostImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

const assetToPostImage = (asset: Asset): PostImage => ({
  id: asset.sys.id,
  width: asset.fields.file.details.image?.width || 0,
  height: asset.fields.file.details.image?.height || 0,
  url: asset.fields.file.url,
});

const toPostEntry = (
  contentfulEntry: Entry<ContentfulEntryProps>
): PostEntry => ({
  id: contentfulEntry.sys.id,
  title: contentfulEntry.fields.title,
  slug: contentfulEntry.fields.slug,
  images: (contentfulEntry.fields.images || []).map(assetToPostImage),
  createdAt: contentfulEntry.sys.createdAt,
  description: contentfulEntry.fields.description || null,
});

export const getAllPostIds = (): Promise<string[]> => {
  const client = createClient({
    accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN!,
    space: process.env.CF_SPACE_ID!,
  });

  return client
    .getEntries<ContentfulEntryProps>({
      order: "sys.createdAt",
    })
    .then((collection) => collection.items)
    .then((items) => items.map((item) => item.sys.id));
};
export const getPage = (): Promise<PostEntry[]> => {
  const client = createClient({
    accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN!,
    space: process.env.CF_SPACE_ID!,
  });

  return client
    .getEntries<ContentfulEntryProps>({
      order: "-sys.createdAt",
    })
    .then((collection) => collection.items)
    .then((items) => items.map(toPostEntry));
};

export const getSingleEntryPage = (entryId: string): Promise<PostEntry> => {
  const client = createClient({
    accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN!,
    space: process.env.CF_SPACE_ID!,
  });

  return client.getEntry<ContentfulEntryProps>(entryId).then(toPostEntry);
};
