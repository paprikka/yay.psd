import { useEffect } from 'react'

export const useRainbowBg = (enable: boolean) =>
    useEffect(() => {
        if (!enable) return
        const cb = () => {
            const viewportHeight = window.innerHeight
            const contentHeight = document.body.getBoundingClientRect().height
            const isPortrait = window.screen.width / window.screen.height < 1
            // Colour wheel spin feels much faster on desktop screens
            const viewportsPerRotation = Math.min(
                isPortrait ? 7 : 20,
                contentHeight / viewportHeight
            )
            const from = 51
            const progress =
                window.scrollY / (viewportHeight * viewportsPerRotation)
            const h = (from + 360 * progress) % 360

            document.body.style.backgroundColor = `hsl(${h}deg, 100%, 50%)`
        }
        window.addEventListener('scroll', cb, { passive: true })
        return () => window.removeEventListener('scroll', cb)
    })
