/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { dateToInputVal } from '../components/get-email-template/date-utils'
import { EmailTemplatePreviewContent } from '../components/get-email-template/preview-content'
import { getPage, PostEntry } from '../data/contentful'
import { generateRSSFeed } from '../data/generate-rss'
import { pushToTwitter } from '../data/twitter/push-to-twitter'
import styles from './get-email-template.module.css'
interface PageProps {
    entries: PostEntry[]
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
                    <EmailTemplatePreviewContent entries={entriesToRender} />
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
