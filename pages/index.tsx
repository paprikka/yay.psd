import type { NextPage } from 'next'
import { useState } from 'react'
import { Feed } from '../components/feed'
import { PageHead } from '../components/head'
import { InfiniteScrollDetector } from '../components/infinite-scroll-detector'
import { PageContainer } from '../components/page-container'
import { getPage, PostEntry } from '../data/contentful'
import { generateRSSFeed } from '../data/generate-rss'
import { updateLazyLoad } from '../hooks/use-lazy-load'
import { track } from '../tracking/track'
interface PageProps {
    entries: PostEntry[]
}

const Home: NextPage<PageProps> = ({ entries }) => {
    const pagesPerEntry = 20
    const [pageIndex, setPageIndex] = useState(0)
    const visibleEntries = [
        ...entries.slice(0, (pageIndex + 1) * pagesPerEntry),
    ]

    const handleReach = () => {
        setPageIndex(pageIndex + 1)
        track('infinite-scroll-page', 'all-posts', `${pageIndex + 1}`)
        updateLazyLoad()
    }

    return (
        <PageContainer>
            <PageHead />
            <Feed entries={visibleEntries} />
            <InfiniteScrollDetector onReach={handleReach} />
        </PageContainer>
    )
}

export const getStaticProps = async () => {
    const entries = await getPage()
    await generateRSSFeed(entries)
    return { props: { entries } }
}
export default Home
