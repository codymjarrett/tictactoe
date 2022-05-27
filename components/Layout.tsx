import React from 'react'

import { Center, Container } from '@chakra-ui/react'

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  return (
    <Container>
      <Center>{children}</Center>
    </Container>
  )
}

export default Layout
