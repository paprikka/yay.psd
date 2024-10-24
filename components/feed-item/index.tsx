import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { PostEntry } from '../../data/contentful'
import { formatDate } from '../../data/format-date'
import styles from './index.module.css'
import placeholderImg from './placeholder.png'
import { AssetRenderer } from '../renderers/asset'

interface FeedItemProps {
    entry: PostEntry
    onClick: (entry: PostEntry) => void
    variant?: 'default' | 'images-only'
}

export const FeedItem: FC<FeedItemProps> = ({
    entry,
    onClick,
    variant = 'default',
}) => {
    const cover = entry.images[0]
    const handleClick = () => onClick(entry)

    return (
        <Link href={`/p/${entry.id}`}>
            <a
                className={
                    variant === 'images-only'
                        ? `${styles.container} ${styles.imagesOnly}`
                        : styles.container
                }
                onClick={handleClick}
            >
                <div className={styles.imageWrapper}>
                    {cover ? (
                        <AssetRenderer entry={entry} image={cover} />
                    ) : (
                        <Image
                            src={placeholderImg}
                            alt={entry.title}
                            width={800}
                            height={800}
                        />
                    )}

                    {variant === 'default' ? (
                        <div className={styles.caption}>
                            <span className={styles.title}>{entry.title}</span>
                            <span className={styles.createdAt}>
                                {formatDate(entry.publishedAt)}
                            </span>
                        </div>
                    ) : null}
                </div>
                {entry.images.length > 1 ? (
                    <div className={styles.showMoreIcon}></div>
                ) : null}
            </a>
        </Link>
    )
}
