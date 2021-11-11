import { Db } from 'mongodb'
import { PostEntry } from '../contentful'

export const getEntriesToPublish = async (db: Db, entries: PostEntry[]) => {
    const syndicatedEntries = entries.filter(
        (entry) => entry.syndicateToTwitter
    )
    if (!syndicatedEntries.length) return []

    const syndicatedEntryIds = syndicatedEntries.map((e) => e.id)

    console.log(
        'All syndicated entries',
        syndicatedEntries.map((e) => e.title)
    )

    const alreadyPostedIdsArr = (await db
        .collection('twitter-syndicated-posts')
        .find({
            entryId: {
                $in: syndicatedEntryIds,
            },
        })
        .toArray()) as { entryId: string }[]

    const alreadyPostedIds = new Set(alreadyPostedIdsArr.map((e) => e.entryId))

    console.log(
        'Already posted entries',
        syndicatedEntries
            .filter((e) => alreadyPostedIds.has(e.id))
            .map((e) => e.title)
    )

    return syndicatedEntries.filter((entry) => !alreadyPostedIds.has(entry.id))
}
