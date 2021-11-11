import { FC, useState } from 'react'
import { PostImage } from '../../data/contentful'
import styles from './video.module.css'

import posterImg from './loading-placeholder.png'

interface VideoRendererProps {
    image: PostImage
}

export const VideoRenderer: FC<VideoRendererProps> = ({ image }) => {
    const [isLoading, setIsLoading] = useState(true)
    const handleCanPlayThrough = () => {
        setIsLoading(false)
    }
    return (
        <video
            // data-poster={posterImg.src}
            data-src={'https:' + image.url}
            className={`${styles.video} is-lazy`}
            muted
            loop
            playsInline
            autoPlay
            onCanPlayThrough={handleCanPlayThrough}
        >
            <source data-src={'https:' + image.url} type='video/mp4' />
        </video>
    )
}
