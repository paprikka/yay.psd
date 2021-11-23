import { FC, useEffect, useRef } from 'react'
import styles from './index.module.css'

interface Props {
    onReach: () => void
}
export const InfiniteScrollDetector: FC<Props> = ({ onReach }) => {
    const detectorEl = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!detectorEl.current) return
        const observer = new IntersectionObserver(
            (entries) => {
                const hasIntersection = entries.find(
                    ({ isIntersecting }) => isIntersecting
                )

                if (hasIntersection) onReach()
            },
            {
                threshold: 0.1,
            }
        )

        observer.observe(detectorEl.current)

        return () => {
            observer.disconnect()
        }
    }, [onReach])
    return (
        <div className={styles.container}>
            <div className={styles.detector} ref={detectorEl} />
        </div>
    )
}
