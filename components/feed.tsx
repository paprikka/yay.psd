import { FC } from 'react'
import { PostEntry } from '../data/contentful'
import styles from './feed.module.css'
import { FeedItem } from './feed-item'
import { track } from '../tracking/track'

interface FeedProps {
    entries: PostEntry[]
}

export const Feed: FC<FeedProps> = ({ entries }) => (
    <ul className={styles.container}>
        {entries.map((entry) => (
            <li key={entry.id} className={styles.entry}>
                <FeedItem
                    entry={entry}
                    onClick={() =>
                        track('click', 'all-posts', entry.slug || '(no-slug)')
                    }
                />
            </li>
        ))}
    </ul>
)
