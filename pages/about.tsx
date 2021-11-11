import type { NextPage } from 'next'
import { PageContainer } from '../components/page-container'
import styles from './about.module.css'
import Image from 'next/image'
import Link from 'next/link'
interface PageProps {}
import headerImg from '../components/about-header.png'
import { PageHead } from '../components/head'
const About: NextPage<PageProps> = () => (
    <PageContainer>
        <PageHead />
        <article className={styles.container}>
            <Image src={headerImg} alt='Rafal Pastuszak' />
            <h1>Hi there</h1>
            <p>
                My name is Rafal Pastuszak (pronounced like <em>pasta</em> and{' '}
                <em>shack</em>). I&rsquo;m a visual artist/tinkerer/software
                engineer currently based in Portugal.
            </p>
            <h2>Contact</h2>
            <p className={styles.note}>
                The best way to contact me?{' '}
                <Link href='https://sonnet.io'>
                    <a>Come and say hi</a>
                </Link>
                !
            </p>
            <ul>
                <li>
                    <Link href='https://sonnet.io'>
                        <a target='_blank'>My blog (tech, psychology)</a>
                    </Link>
                </li>
                <li>
                    <Link href='https://twitter.com/rafalpast'>
                        <a target='_blank'>Twitter</a>
                    </Link>
                </li>
                <li>
                    <Link href='https://rafsters.itch.io/all-hands'>
                        <a target='_blank'>Games</a>
                    </Link>
                </li>
                <li>
                    <Link href='https://instagram.com/yay.psd'>
                        <a target='_blank'>Insta</a>
                    </Link>
                </li>
                <li>
                    <Link href='https://instagram.com/rafalpast'>
                        <a target='_blank'>Photography Insta</a>
                    </Link>
                </li>
            </ul>
        </article>
    </PageContainer>
)

export const getStaticProps = async () => ({
    props: {},
})
export default About
