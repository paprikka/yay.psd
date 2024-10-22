import { FC } from 'react'
import { PostEntry } from '../../data/contentful'
import styles from './index.module.css'
import { track } from '../../tracking/track'
import { FeedItem } from '../feed-item'

interface GridProps {
    entries: PostEntry[]
}

export const Grid: FC<GridProps> = ({ entries }) => (
    <ul className={styles.container}>
        {entries.map((entry) => (
            <li
                key={entry.id}
                className={styles.entry}
                style={
                    {
                        '--rotate-entry': `${Math.random() * 7 - 3.5}deg`,
                    } as React.CSSProperties
                }
            >
                <FeedItem
                    variant='images-only'
                    entry={entry}
                    onClick={() =>
                        track('click', 'all-posts', entry.slug || '(no-slug)')
                    }
                />
            </li>
        ))}
    </ul>
)
