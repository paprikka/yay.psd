import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { PostEntry } from '../../data/contentful'
import { formatDate } from '../../data/format-date'
import styles from './index.module.css'
import placeholderImg from './placeholder.png'
import { AssetRenderer } from '../renderers/asset'
interface GridItemProps {
    entry: PostEntry
    onClick: (entry: PostEntry) => void
}

export const GridItem: FC<GridItemProps> = ({ entry, onClick }) => {
    const cover = entry.images[0]
    const handleClick = () => onClick(entry)
    return (
        <Link href={`/p/${entry.id}`}>
            <a className={styles.container} onClick={handleClick}>
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

                    <div className={styles.caption}>
                        <span className={styles.title}>{entry.title}</span>
                        <span className={styles.createdAt}>
                            {formatDate(entry.publishedAt)}
                        </span>
                    </div>
                </div>
                {entry.images.length > 1 ? (
                    <div className={styles.showMoreIcon}></div>
                ) : null}
            </a>
        </Link>
    )
}
