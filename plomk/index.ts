import { useEffect, useRef } from 'react'

export const usePlomk = () => {
    const audioRef = useRef<HTMLAudioElement>()

    function plomkNow() {
        const audio = audioRef.current
        if (!audio) return

        audio.currentTime = 0
        audio.pause()
        audio.play()
    }

    useEffect(() => {
        if (!audioRef.current) {
            console.log('Plomk: Creating audio element')
            audioRef.current = new Audio('/sfx/click_2.mp3')
            audioRef.current.preload = 'auto'
            audioRef.current.oncanplaythrough = () =>
                console.log('Probably can plomk (oncanplaythrough)')
        }

        const onInteract = (e: PointerEvent) => {
            const target = e.target as HTMLElement
            if (!target) return
            const isPlomkable =
                target.matches('a, button, select') ||
                target.closest('a, button, select')
            if (!isPlomkable) return

            plomkNow()
        }

        document.addEventListener('pointerdown', onInteract)

        return () => {
            document.removeEventListener('pointerdown', onInteract)
        }
    }, [])

    return plomkNow
}
