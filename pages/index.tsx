import type { NextPage } from 'next'
import { getPage, PostEntry } from '../data/contentful'
import { Grid } from '../components/grid'
import { PageContainer } from '../components/page-container'
import { PageHead } from '../components/head'
import { generateRSSFeed } from '../data/generate-rss'
import { pushToTwitter } from '../data/twitter/push-to-twitter'
import { FC, useEffect, useState } from 'react'
import { InfiniteScrollDetector } from '../components/infinite-scroll-detector'
import { updateLazyLoad } from '../hooks/use-lazy-load'
interface PageProps {
    entries: PostEntry[]
}

const Home: NextPage<PageProps> = ({ entries }) => {
    const pagesPerEntry = 3
    const [pageIndex, setPageIndex] = useState(0)
    const visibleEntries = [
        ...entries.slice(0, (pageIndex + 1) * pagesPerEntry),
    ]

    const handleReach = () => {
        console.log('reacharooo', pageIndex + 1)
        setPageIndex(pageIndex + 1)
        updateLazyLoad()
    }

    return (
        <PageContainer>
            <PageHead />
            <Grid entries={visibleEntries} />
            <InfiniteScrollDetector onReach={handleReach} />
        </PageContainer>
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
export default Home
