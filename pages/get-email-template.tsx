import type { NextPage } from 'next'
import { ChangeEventHandler, useMemo, useState } from 'react'
import { Grid } from '../components/grid'
import { PageHead } from '../components/head'
import { InfiniteScrollDetector } from '../components/infinite-scroll-detector'
import { PageContainer } from '../components/page-container'
import { getPage, PostEntry } from '../data/contentful'
import { generateRSSFeed } from '../data/generate-rss'
import { pushToTwitter } from '../data/twitter/push-to-twitter'
import { updateLazyLoad } from '../hooks/use-lazy-load'
import { track } from '../tracking/track'
interface PageProps {
    entries: PostEntry[]
}
import styles from './get-email-template.module.css'

const pad = (n: number): string => n.toString().padStart(2, '0')
const dateToInputVal = (date: Date) =>
    `${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}`

const week = 7 * 24 * 60 * 60 * 1000
const EmailTemplate: NextPage<PageProps> = ({ entries }) => {
    const [from, setFrom] = useState<string>(() =>
        dateToInputVal(new Date(Date.now() - week))
    )
    const [to, setTo] = useState<string>(() => dateToInputVal(new Date()))

    const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setFrom(e.target.value)

    const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setTo(e.target.value)

    const entriesToRender = useMemo(
        () => entries.filter((entry) => true),
        [from, to]
    )

    return (
        <div className={styles.container}>
            <div className={styles.editor}>
                <div className={styles.tools}>
                    <label>
                        From:
                        <input
                            type='date'
                            value={from}
                            onChange={handleFromChange}
                        />
                    </label>
                    <label>
                        To:
                        <input
                            type='date'
                            value={to}
                            onChange={handleToChange}
                        />
                    </label>
                </div>
            </div>
            <div className={styles.preview}>
                <pre>{JSON.stringify(entriesToRender, null, 2)}</pre>
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const entries = await getPage()
    await generateRSSFeed(entries)
    await pushToTwitter(entries)
    return {
        props: {
            entries,
        },
    }
}
export default EmailTemplate
