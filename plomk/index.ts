import { useEffect, useRef } from 'react'

export const usePlomk = () => {
    const audioRef = useRef<HTMLAudioElement>()

    function plomkNow(pitchShift = 0.1) {
        const audio = audioRef.current
        if (!audio) return

        const originalPlaybackRate = audio.playbackRate
        const pitchFactor = 1 + Math.random() * pitchShift
        audio.playbackRate = originalPlaybackRate * pitchFactor
        audio.play()
    }

    useEffect(() => {
        console.log('Pre-plomking')
        audioRef.current = new Audio('/sfx/click_2.mp3')
        audioRef.current.preload = 'auto'
        audioRef.current.oncanplaythrough = () =>
            console.log('Probably can plomk (oncanplaythrough)')

        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            if (!target) return
            const isPlomkable =
                target.matches('a, button, select') ||
                target.closest('a, button, select')
            if (!isPlomkable) return

            plomkNow(0)
        })
    }, [])

    return plomkNow
}
