import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import React, { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { chooseMakerSelection, initializeGame } from '../features/app/appSlice'

import Image from 'next/image'
import { TypeMarkerSelection } from '../types'

import MarkerChooser from '../components/MarkerChooser'
import PlayerButton from '../components/PlayerButton'
import Layout from '../components/Layout'

import {
  Box,
  Container,
  Flex,
  Center,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const [marker, setMarker] = useState<TypeMarkerSelection>(
    TypeMarkerSelection.CROSS,
  )

  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleDispatchMarkerSelection = () => {
    dispatch(chooseMakerSelection(marker))
    dispatch(initializeGame())
    router.push('/game')
  }
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
        <VStack mt={10} spacing="30px">
          <Box
            bg="app.SemiDarkNavy"
            w="460px"
            h="205px"
            borderRadius="xl"
            style={{ boxShadow: '#10212A 1px 10px 0px -1px' }}
          >
            <Center p={5}>
              <Text color="app.darkSilver" fontWeight="bold">
                {/* may need to be dynamic */}
                {"Pick Player 1's Mark".toUpperCase()}
              </Text>
            </Center>
            <MarkerChooser marker={marker} setMarker={setMarker} />
          </Box>
          <PlayerButton onMarkerSelection={handleDispatchMarkerSelection} />
        </VStack>
      </Container>
    </Layout>
  )
}

export default Home
