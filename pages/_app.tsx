import { usePlomk } from '../plomk'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    usePlomk()

    return <Component {...pageProps} />
}

export default MyApp
