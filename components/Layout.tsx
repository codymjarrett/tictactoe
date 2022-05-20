import React from 'react'

import { Box, Center } from '@chakra-ui/react'

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  return (
    <Box bg="app.darkNavy" h="100vh">
      <Center>{children}</Center>
    </Box>
  )
}

export default Layout
