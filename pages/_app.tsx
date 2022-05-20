import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../store'
import { Provider } from 'react-redux'

import '@fontsource/outfit/500.css'
import '@fontsource/outfit/700.css'

import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
