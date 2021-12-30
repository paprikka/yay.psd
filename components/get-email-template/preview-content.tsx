import { FC } from 'react'
import { PostEntry } from '../../data/contentful'
import { EmailTemplateEntry } from './entry'
import { inlineStyles } from './inline-styles'

export const EmailTemplatePreviewContent: FC<{ entries: PostEntry[] }> = ({
    entries,
}) => (
    <div style={inlineStyles.container}>
        {entries.map((entry) => (
            <EmailTemplateEntry key={entry.id} entry={entry} />
        ))}
    </div>
)
