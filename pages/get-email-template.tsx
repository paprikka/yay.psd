import type { NextPage } from 'next'
import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { getPage, PostEntry, PostImage } from '../data/contentful'
import { generateRSSFeed } from '../data/generate-rss'
import { pushToTwitter } from '../data/twitter/push-to-twitter'
import styles from './get-email-template.module.css'
interface PageProps {
    entries: PostEntry[]
}

const pad = (n: number): string => n.toString().padStart(2, '0')
const dateToInputVal = (date: Date) =>
    `${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}`

const assetStyle = { maxWidth: '100%', height: 'auto' }
const renderAsset = (asset: PostImage) => {
    if (asset.contentType.startsWith('video'))
        return <video key={asset.id} src={asset.url} style={assetStyle} />

    // eslint-disable-next-line @next/next/no-img-element
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img key={asset.id} src={asset.url} style={assetStyle}></img>
}
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

    const entriesToRender = useMemo(() => {
        const toDate = new Date(to)
        const fromDate = new Date(from)

        return entries.filter(({ publishedAt }) => {
            const publishedAtDate = new Date(publishedAt)
            return publishedAtDate > fromDate && publishedAtDate < toDate
        })
    }, [entries, from, to])

    const templateEl = useRef<HTMLDivElement>(null)
    const [HTMLString, setHTMLString] = useState('')

    useEffect(() => {
        if (!templateEl.current) return
        setHTMLString(templateEl.current.innerHTML)
    }, [])

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
                <div className={styles.html} ref={templateEl}>
                    {entriesToRender.map((e) => (
                        <div key={e.id}>
                            <div>{e.title}</div>

                            <div>{e.images.map(renderAsset)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.preview}>
                <pre>{HTMLString}</pre>
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
