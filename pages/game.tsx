import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useAppSelector } from '../hooks'

import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Image,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'

import RedoButton from '../components/RedoButton'
import NextMarkerOrder from '../components/NextMarkerOrder'
import Marker from '../components/Marker'
import WinnerModal from '../components/WinnerModal'

import MarkerButton from '../components/MarkerButton'

import {
  selectPlayerOneMarker,
  selectPlayerOneWins,
  selectPlayerTwoWins,
  selectTies,
} from '../selectors'

import { selectMarkerTurn, selectGameStarted, selectMatrix } from '../selectors'
import { TypeMarkerType } from '../types'

const GameMatrixHeader = () => {
  const markerTurn = useAppSelector(selectMarkerTurn)
  const isGameStarted = useAppSelector(selectGameStarted)
  const isCross = markerTurn === TypeMarkerType.CROSS

  const router = useRouter()

  React.useEffect(() => {
    // prevents the user from going directly to /game without starting a game
    if (!isGameStarted) {
      router.push('/')
    }
  }, [isGameStarted, router])

  return (
    <React.Fragment>
      <NextMarkerOrder markerTurn={markerTurn} />
      <GridItem
        bg="app.SemiDarkNavy"
        borderRadius="xl"
        style={{ boxShadow: '#10212A 0px 5px 0px -1px' }}
      >
        <HStack alignItems="center" height="full" justifyContent="center">
          <Image
            src={isCross ? '/silver-cross.svg' : '/silver-circle.svg'}
            boxSize="22px"
            alt={isCross ? 'X' : 'O'}
          />
          <Text color="app.darkSilver" fontSize="14" fontWeight="bold">
            {'turn'.toUpperCase()}
          </Text>
        </HStack>
      </GridItem>
      <RedoButton />
    </React.Fragment>
  )
}
const GameMatrixFooter = () => {
  const playerOneMarker = useAppSelector(selectPlayerOneMarker)
  const playerOneWins = useAppSelector(selectPlayerOneWins)
  const playerTwoWins = useAppSelector(selectPlayerTwoWins)
  const ties = useAppSelector(selectTies)

  return (
    <React.Fragment>
      <GridItem
        bg="app.lightBlue"
        borderRadius="xl"
        h="72px"
        style={{ boxShadow: '#10212A 0px 5px 0px -1px' }}
      >
        <Center p={2}>
          <VStack>
            <Box>
              <Text align="center">
                X {playerOneMarker === TypeMarkerType.CROSS ? '(P1)' : '(P2)'}
              </Text>
              <Text align="center" fontSize="2xl" fontWeight="bold">
                {playerOneWins}
              </Text>
            </Box>
          </VStack>
        </Center>
      </GridItem>
      <GridItem
        bg="app.darkSilver"
        borderRadius="xl"
        h="72px"
        style={{ boxShadow: '#10212A 0px 5px 0px -1px' }}
      >
        <Center p={2}>
          <VStack>
            <Box>
              <Text align="center">TIES</Text>
              <Text align="center" fontSize="2xl" fontWeight="bold">
                {ties}
              </Text>
            </Box>
          </VStack>
        </Center>
      </GridItem>
      <GridItem
        bg="app.yellow"
        borderRadius="xl"
        h="72px"
        style={{ boxShadow: '#10212A 0px 5px 0px -1px' }}
      >
        <Center p={2}>
          <VStack>
            <Box>
              <Text align="center">
                O {playerOneMarker === TypeMarkerType.CIRCLE ? '(P1)' : '(P2)'}
              </Text>
              <Text align="center" fontSize="2xl" fontWeight="bold">
                {playerTwoWins}
              </Text>
            </Box>
          </VStack>
        </Center>
      </GridItem>
    </React.Fragment>
  )
}

const GameMatrix = () => {
  const matrix = useAppSelector(selectMatrix)

  const [isLargerThan468] = useMediaQuery('(min-width: 468px)')

  const responsiveTemplateRows = isLargerThan468
    ? '50px 140px 140px 140px'
    : '30px 110px 110px 110px'

  const responsiveTemplateColumns = isLargerThan468
    ? 'repeat(3, 140px)'
    : 'repeat(3, 100px)'

  return (
    <Box>
      <Grid
        h="461px"
        templateRows={`${responsiveTemplateRows}`}
        templateColumns={`${responsiveTemplateColumns}`}
        gap={4}
      >
        <GameMatrixHeader />
        {matrix.map((_, idx) => (
          <GridItem
            bg="app.SemiDarkNavy"
            borderRadius="xl"
            key={idx}
            style={{ boxShadow: '#10212A 0px 5px 0px -1px' }}
          >
            <MarkerButton matrixId={idx}>
              <Marker matrixId={idx} />
            </MarkerButton>
          </GridItem>
        ))}
        <GameMatrixFooter />
      </Grid>
    </Box>
  )
}

const Game: NextPage = () => {
  const [isLargerThan468] = useMediaQuery('(min-width: 468px)')

  return (
    <Container mt={isLargerThan468 ? 52 : 20}>
      <Center>
        <GameMatrix />
        <WinnerModal />
      </Center>
    </Container>
  )
}

export default Game
