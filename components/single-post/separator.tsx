interface SeparatorProps {
    index: number
    max: number
    children?: ReactNode
}

import styles from './separator.module.css'

import { FC, ReactNode, useMemo } from 'react'
import separator0 from './arrow_0.png'
import separator1 from './arrow_1.png'
import separator2 from './arrow_2.png'
import separator3 from './arrow_3.png'
import separatorFinal from './arrow_final.png'

const separators = [separator0, separator1, separator2, separator3]

export const Separator: FC<SeparatorProps> = ({ index, max, children }) => {
    const style = useMemo(() => {
        const img =
            index === max
                ? separatorFinal
                : separators[index % separators.length]
        return {
            backgroundImage: `url(${img.src})`,
        }
    }, [index, max])

    return (
        <div className={styles.separator} style={style}>
            {children}
        </div>
    )
}
