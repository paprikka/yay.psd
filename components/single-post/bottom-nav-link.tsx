import { FC } from 'react'
import styles from './bottom-nav-link.module.css'
import Link from 'next/link'

interface BottomNavLinkProps {
    to: string
    isDisabled?: boolean
    type: 'next' | 'prev' | 'random'
    onClick?: () => void
}

const noop = () => {}
export const BottomNavLink: FC<BottomNavLinkProps> = ({
    to,
    isDisabled,
    type,
    onClick,
}) => {
    let variantClass = ''
    if (type === 'next') variantClass = styles.navLinkNext
    if (type === 'prev') variantClass = styles.navLinkPrev
    if (type === 'random') variantClass = styles.navLinkRandom

    if (isDisabled)
        return (
            <span
                className={`${styles.navLinkDisabled} ${variantClass}`}
                role='img'
                aria-label={type}
            />
        )
    return (
        <Link href={to}>
            <a
                onClick={onClick || noop}
                className={`${styles.navLink} ${variantClass}`}
                role='img'
                aria-label={type}
            />
        </Link>
    )
}
