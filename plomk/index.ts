import { useEffect, useRef } from 'react'

let audio: HTMLAudioElement | null = null
export const usePlomk = () => {
    console.log('Plomk: Initializing')
    async function plomkNow() {
        if (!audio) {
            console.log('Plomk: No audio element')
            return
        }

        if (audio.paused) return audio.play()

        audio.currentTime = 0
    }

    useEffect(() => {
        if (!audio) {
            console.log('Plomk: Creating audio element')
            audio = new Audio('/sfx/click_2.mp3')
            audio.preload = 'auto'
            audio.oncanplaythrough = () =>
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

        document.addEventListener('pointerdown', onInteract, {
            passive: true,
        })

        return () => {
            document.removeEventListener('pointerdown', onInteract)
        }
    }, [])
}
