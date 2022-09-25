import Twitter from 'twitter'
import { getDB } from '../../pages/api/db'
import { PostEntry } from '../contentful'
import { getEntryUrlFromId } from '../get-entry-url-from-id'
import { entryToTweet } from './entry-to-tweet'
import { getEntriesToPublish } from './get-entries-to-publish'

const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET,
} = process.env

export const pushToTwitter = async (entries: PostEntry[]) => {
    if (
        !(
            TWITTER_CONSUMER_KEY &&
            TWITTER_CONSUMER_SECRET &&
            TWITTER_ACCESS_TOKEN &&
            TWITTER_ACCESS_SECRET
        )
    )
        return Promise.reject(new Error('Missing Twitter API config.'))

    const config = {
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        access_token_secret: TWITTER_ACCESS_SECRET,
        access_token_key: TWITTER_ACCESS_TOKEN,
    }

    console.log('Syndicate Twitter posts')

    const client = new Twitter(config)
    const db = await getDB()

    const entriesToSend = await getEntriesToPublish(db, entries)

    console.log(
        'Entries to Tweet',
        entriesToSend.map((e) => e.title)
    )

    if (process.env.TWITTER_CONSUMER_KEY === '<local-test>') {
        console.log('Dry run, exiting early...')
        return
    }

    const onError = (entry: PostEntry) => () => {
        return db.collection('twitter-syndicated-posts').findOneAndUpdate(
            {
                entryId: entry.id,
            },
            {
                $set: { status: 'failed' },
            }
        )
    }

    const onSuccess = (entry: PostEntry) => () =>
        db.collection('twitter-syndicated-posts').findOneAndUpdate(
            {
                entryId: entry.id,
            },
            { $set: { status: 'success' } }
        )

    const onSyndicateStart = (entry: PostEntry) =>
        db
            .collection('twitter-syndicated-posts')
            .insertOne({
                entryId: entry.id,
                status: 'in-progress',
                url: getEntryUrlFromId(entry.id),
            })
            .then((_) => entry)

    const sendTweet = (status: string) =>
        client.post('statuses/update', { status })

    const processAndSendEntry = (entry: PostEntry) =>
        onSyndicateStart(entry)
            .then(() => entryToTweet(entry))
            .then(sendTweet)
            .then(onSuccess(entry))
            .catch(onError(entry))

    return Promise.all(entriesToSend.map(processAndSendEntry))
        .then(() => console.log('Twitter syndication complete.'))
        .catch((error) => console.log('Twitter syndication error', error))
}
