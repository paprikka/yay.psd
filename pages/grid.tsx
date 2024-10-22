import type { NextPage } from 'next'
import { useState } from 'react'
import { Grid } from '../components/grid'
import { PageHead } from '../components/head'
import { InfiniteScrollDetector } from '../components/infinite-scroll-detector'
import { PageContainer } from '../components/page-container'
import { getPage, PostEntry } from '../data/contentful'
import { updateLazyLoad } from '../hooks/use-lazy-load'
import { track } from '../tracking/track'

interface PageProps {
    entries: PostEntry[]
}

const Home: NextPage<PageProps> = ({ entries }) => (
    <PageContainer layout='full-width' enableRainbowBg={false}>
        <PageHead />
        <Grid entries={entries} />
    </PageContainer>
)

export const getStaticProps = async () => {
    const entries = await getPage()
    return { props: { entries } }
}
export default Home
