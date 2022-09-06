import { Toaster } from 'react-hot-toast'

import { Layout } from '../components'
import { StateContext } from '../context/StateContext'
import '../styles/globals.css'
import '../styles/image.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
