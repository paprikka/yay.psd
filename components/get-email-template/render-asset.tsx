/* eslint-disable @next/next/no-img-element */
import { PostEntry, PostImage } from '../../data/contentful'
import { inlineStyles } from './inline-styles'

export const renderAsset = (asset: PostImage, entry: PostEntry) => {
    if (asset.contentType.startsWith('video'))
        return (
            <video
                key={asset.id}
                src={asset.url}
                style={inlineStyles.assetPreview}
            />
        )

    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <img
            key={asset.id}
            src={asset.url}
            alt={entry.title}
            style={inlineStyles.assetPreview}
        ></img>
    )
}
