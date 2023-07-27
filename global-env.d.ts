type Umami = (eventValue: string) => void & {
    trackEvent: (
        eventValue: string,
        eventType: string,
        url?: string,
        siteId?: string
    ) => void
}

declare var umami: Umami

// umami.trackEvent('Signup button click', 'signup', '/home', '94db1cb1-74f4-4a40-ad6c-962362670409');

declare module '*.mp3' {
    const mp3File: string
    export default mp3File
}
