import { CSSProperties } from 'react'

export const inlineStyles: { [key: string]: CSSProperties } = {
    assetPreview: { maxWidth: '100%', height: 'auto' },
    container: {
        padding: 10,
        background: '#ffd900',
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: '1em',
    },
    entry: {
        marginBottom: 20,
    },
    publishedAt: {
        fontSize: 12,
    },
}
