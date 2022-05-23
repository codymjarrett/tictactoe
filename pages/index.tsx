import type { NextPage } from 'next'

import React from 'react'

import Image from 'next/image'

import MarkerChooser from '../components/MarkerChooser'
import PlayerButton from '../components/PlayerButton'
import Layout from '../components/Layout'

import { Box, Container, Center, HStack, Text, VStack } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Layout>
      <Container mt={52}>
        <HStack spacing="24px" justify="center">
          <Box>
            <Image src="/cross.svg" width={40} height={40} alt="X" />
          </Box>
          <Box>
            <Image src="/circle.svg" width={40} height={40} alt="O" />
          </Box>
        </HStack>
        <VStack mt={6} spacing="30px">
          <Box
            bg="app.SemiDarkNavy"
            w="460px"
            h="205px"
            borderRadius="xl"
            style={{ boxShadow: '#10212A 0px 5px 0px -1px' }}
          >
            <Center p={5}>
              <Text color="app.darkSilver" fontWeight="bold">
                {"Pick Player 1's Mark".toUpperCase()}
              </Text>
            </Center>
            <MarkerChooser />
            <Center p={5}>
              <Text color="app.darkSilver" fontSize={12}>
                {'Remember X goes first'.toUpperCase()}
              </Text>
            </Center>
          </Box>
          <PlayerButton />
        </VStack>
      </Container>
    </Layout>
  )
}

export default Home
