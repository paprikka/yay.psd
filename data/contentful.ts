import { createClient, Asset, Entry } from 'contentful'

interface ContentfulEntryProps {
    title: string
    images: Asset[]
    slug?: string
    description?: string
    publicationDateOverride?: string
    syndicateToTwitter?: boolean
}

export interface PostEntry {
    id: string
    title: string
    slug: string | null
    images: PostImage[]
    publishedAt: string
    description: string | null
    syndicateToTwitter: boolean
}

export interface PostImage {
    id: string
    width: number
    height: number
    url: string
    contentType: string
}

export const assetToPostImage = (asset: Asset): PostImage => ({
    id: asset.sys.id,
    width: asset.fields.file.details.image?.width || 0,
    height: asset.fields.file.details.image?.height || 0,
    url: asset.fields.file.url,
    contentType: asset.fields.file.contentType,
})

const toPostEntry = (
    contentfulEntry: Entry<ContentfulEntryProps>
): PostEntry => ({
    id: contentfulEntry.sys.id,
    title: contentfulEntry.fields.title,
    slug: contentfulEntry.fields.slug || null,
    images: (contentfulEntry.fields.images || []).map(assetToPostImage),
    publishedAt:
        contentfulEntry.fields.publicationDateOverride ||
        contentfulEntry.sys.createdAt,
    description: contentfulEntry.fields.description || null,
    syndicateToTwitter: contentfulEntry.fields.syndicateToTwitter || false,
})

let cachedPostEntries: Entry<ContentfulEntryProps>[] | null = null
const getAllPostEntries = (): Promise<Entry<ContentfulEntryProps>[]> => {
    if (cachedPostEntries) {
        console.log('Returning cached Contentful post entries')
        return Promise.resolve(cachedPostEntries)
    }

    const client = createClient({
        accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN!,
        space: process.env.CF_SPACE_ID!,
    })

    return client
        .getEntries<ContentfulEntryProps>({
            order: '-fields.publicationDateOverride,-sys.createdAt',
            content_type: 'imagePost',
            limit: 1000,
        })
        .then((collection) => collection.items)
        .then((entries) => {
            cachedPostEntries = entries
            return entries
        })
}
export const getAllPostIds = (): Promise<string[]> =>
    getAllPostEntries().then((items) => items.map((item) => item.sys.id))

export const getPage = (): Promise<PostEntry[]> =>
    getAllPostEntries().then((items) => items.map(toPostEntry))

export const getSingleEntryPage = async (
    entryId: string
): Promise<PostEntry> => {
    const client = createClient({
        accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN!,
        space: process.env.CF_SPACE_ID!,
    })

    const entry = await client.getEntry<ContentfulEntryProps>(entryId)
    return toPostEntry(entry)
}
