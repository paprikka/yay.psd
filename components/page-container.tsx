import { FC } from 'react'
import styles from './page-container.module.css'
import { Nav } from './nav'
import { useRainbowBg } from '../hooks/use-rainbow-bg'

import Image from 'next/image'
import logo from './logo.png'
import Link from 'next/link'
import { useFavicon } from '../hooks/use-favicon'
import { useLazyLoad } from '../hooks/use-lazy-load'
interface PageContainerProps {
    children: React.ReactNode
    layout?: 'normal' | 'full-width'
    enableRainbowBg?: boolean
}
export const PageContainer: FC<PageContainerProps> = ({
    children,
    layout = 'normal',
    enableRainbowBg = true,
}) => {
    useRainbowBg(enableRainbowBg)
    useFavicon()
    useLazyLoad('video.is-lazy')

    return (
        <div
            className={
                layout === 'full-width'
                    ? `${styles.container} ${styles.isFullWidth}`
                    : styles.container
            }
        >
            <Link href='/'>
                <a className={styles.siteLogo}>
                    <Image priority src={logo} alt='yay.psd' />
                </a>
            </Link>
            <Nav />
            {children}
            <a rel='me' hidden href='https://mastodon.cloud/@raf'>
                Mastodon
            </a>
        </div>
    )
}
