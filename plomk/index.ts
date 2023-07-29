import { useEffect, useRef } from 'react'

let audioBuffer: AudioBufferSourceNode | null = null
async function playAudio(src: string) {
    let audioContext = new window.AudioContext()

    // If audioBuffer is already defined, stop and release the old source
    if (audioBuffer) {
        audioBuffer.stop()
    }

    // Fetch the audio file
    let response = await fetch(src)
    let arrayBuffer = await response.arrayBuffer()

    // Decode the audio file
    let audioData = await audioContext.decodeAudioData(arrayBuffer)

    // Create a buffer source
    audioBuffer = audioContext.createBufferSource()
    audioBuffer.buffer = audioData

    // Connect the source to the context's destination (the speakers)
    audioBuffer.connect(audioContext.destination)

    // Play the audio
    audioBuffer.start()
}

export const usePlomk = () => {
    let audioRef = useRef<HTMLAudioElement | null>(null)
    console.log('Plomk: Initializing')
    async function plomkNow() {
        playAudio('/sfx/click_2.mp3')
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

        document.addEventListener('pointerdown', onInteract, {
            passive: true,
        })

        return () => {
            document.removeEventListener('pointerdown', onInteract)
        }
    }, [])
}
