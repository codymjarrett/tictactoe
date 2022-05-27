import type { NextPage } from 'next'

import React from 'react'

import { useAppDispatch } from '../hooks'
import { resetGame } from '../features/app/appSlice'

import MarkerChooser from '../components/MarkerChooser'
import PlayerButton from '../components/PlayerButton'
import Layout from '../components/Layout'

import {
  Box,
  Container,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    // we should always reset the store when this page is hit to avoid backspacing and still having live state
    dispatch(resetGame())
  })
  return (
    <Layout>
      <Center mt={52} w="100%">
        <Box w="90%">
          <HStack spacing="24px" justify="center">
            <Box>
              <Image src="/cross.svg" boxSize="40px" alt="X" />
            </Box>
            <Box>
              <Image src="/circle.svg" boxSize="40px" alt="O" />
            </Box>
          </HStack>
          <VStack mt={6} spacing="30px">
            <Box
              bg="app.SemiDarkNavy"
              width="100%"
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
        </Box>
      </Center>
    </Layout>
  )
}

export default Home
