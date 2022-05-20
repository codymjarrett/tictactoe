import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    app: {
      darkNavy: '#1A2A33',
      SemiDarkNavy: '#1F3641',
      darkSilver: '#A8BFC9',
      yellow: '#F2B137',
      lightBlue: '#31C3BD',
      semiLightBlue: '#65E9E4',
    },
  },
  fonts: {
    body: 'Outfit, sans-serif',
  },
  sizes: {
    half: '50%',
  },
  space: {
    half: '50%',
  },
})
