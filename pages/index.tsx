import type { NextPage } from 'next'
import { getPage, PostEntry } from '../data/contentful'
import { Grid } from '../components/grid'
import { PageContainer } from '../components/page-container'
import { PageHead } from '../components/head'
import { generateRSSFeed } from '../data/generate-rss'
import { pushToTwitter } from '../data/twitter/push-to-twitter'
interface PageProps {
    entries: PostEntry[]
}

const Home: NextPage<PageProps> = ({ entries }) => {
    return (
        <PageContainer>
            <PageHead />
            <Grid entries={entries} />
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
