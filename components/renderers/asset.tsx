import { FC } from 'react'
import { PostEntry, PostImage } from '../../data/contentful'
import { ImageRenderer } from './image'
import { VideoRenderer } from './video'

interface AssetRendererProps {
    entry: PostEntry
    image: PostImage
}

export const AssetRenderer: FC<AssetRendererProps> = ({ entry, image }) => {
    const contentTypeBase = image.contentType.split('/')[0]

    switch (contentTypeBase) {
        case 'image':
            return <ImageRenderer entry={entry} image={image} />
        case 'video':
            return <VideoRenderer image={image} />
        default:
            return null
    }
}
