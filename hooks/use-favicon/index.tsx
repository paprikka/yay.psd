import { useEffect, useMemo, useState } from 'react'

import fav_0 from './fav-0.png'
import fav_1 from './fav-1.png'
import fav_2 from './fav-2.png'
import fav_3 from './fav-3.png'

const icons = [fav_0, fav_1, fav_2, fav_3].map((i) => i.src)

let counter = -1
const loop = () => {
    const el = document.querySelector<HTMLLinkElement>('#favicon')
    if (!el) return
    counter += 1
    const url = counter === -1 ? 'favicon.png' : icons[counter % icons.length]
    el.setAttribute('href', url)
}

export const useFavicon = () => {
    const isReady = typeof window !== 'undefined'
    useEffect(() => {
        if (!isReady) return
        const timer = setInterval(loop, 1000 / 4)
        return () => clearInterval(timer)
    }, [isReady])
}
