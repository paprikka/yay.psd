import { FC } from 'react'
import { PostEntry } from '../../data/contentful'
import { dateToInputVal } from './date-utils'
import { inlineStyles } from './inline-styles'
import { renderAsset } from './render-asset'

export const EmailTemplateEntry: FC<{ entry: PostEntry }> = ({ entry }) => (
    <div key={entry.id} style={inlineStyles.entry}>
        <div style={inlineStyles.publishedAt}>
            {dateToInputVal(new Date(entry.publishedAt))}
        </div>
        <div style={inlineStyles.title}>{entry.title}</div>
        {entry.description ? (
            <p style={inlineStyles.description}>{entry.description}</p>
        ) : null}

        {entry.images.map((asset) => renderAsset(asset, entry))}
    </div>
)
