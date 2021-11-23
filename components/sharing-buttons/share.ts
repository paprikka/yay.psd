export const share = (url: string) => {
    if (!window.ClipboardItem)
        return Promise.reject(new Error('Clipboard access not supported'))
    return navigator.clipboard.writeText(url)
}
