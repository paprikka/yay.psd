import { useEffect } from 'react'
import LazyLoad, { ILazyLoadInstance } from 'vanilla-lazyload'

let instance: ILazyLoadInstance | null = null

export const updateLazyLoad = () => {
    if (!instance) return
    instance.update()
}

export const useLazyLoad = (selector: string) => {
    useEffect(() => {
        if (!instance) {
            instance = new LazyLoad({
                elements_selector: '.is-lazy',
            })
        }

        instance.update()
    }, [selector])
}
