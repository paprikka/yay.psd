type EventType = 'click' | 'submit' | 'infinite-scroll-page'
type ViewId = 'single-post' | 'all-posts' | 'subscribe'
export const track = (
    eventType: EventType,
    viewId: ViewId,
    eventId: string
) => {
    if (!('umami' in window)) return
    if (location.host.startsWith('localhost')) {
        console.log(
            `[track] %c${eventType}:${viewId}:${eventId}`,
            'color: white; background: blue; '
        )
        return
    }
    umami(`${eventType}:${viewId}:${eventId}`)
}
