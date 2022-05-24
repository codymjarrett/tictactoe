import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useAppSelector } from '../hooks'

import { Box, Button, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import Layout from '../components/Layout'
import RedoButton from '../components/RedoButton'
import NextMarkerOrder from '../components/NextMarkerOrder'
import Marker from '../components/Marker'
import WinnerModal from '../components/WinnerModal'

import MarkerHoverButton from '../components/MarkerHoverButton'

import {
  selectMarkerTurn,
  selectGameStarted,
  selectWinnerDetermined,
  selectMatrix,
} from '../selectors'
import { TypeMarkerType } from '../types'

const GameMatrixHeader = () => {
  const markerTurn = useAppSelector((state) => selectMarkerTurn(state))
  const isGameStarted = useAppSelector((state) => selectGameStarted(state))
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
            width={22}
            height={22}
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
  return (
    <React.Fragment>
      <GridItem>h</GridItem>
      <GridItem>h</GridItem>
      <GridItem>h</GridItem>
    </React.Fragment>
  )
}

const GameMatrix = () => {
  const matrix = useAppSelector(selectMatrix)

  return (
    <Grid
      h="461px"
      templateRows="50px 140px 140px 140px"
      templateColumns={`repeat(3, 140px)`}
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
          <MarkerHoverButton matrixId={idx}>
            <Marker matrixId={idx} />
          </MarkerHoverButton>
        </GridItem>
      ))}
      <GameMatrixFooter />
    </Grid>
  )
}

const Game: NextPage = () => {
  return (
    <Layout>
      <Box mt={52}>
        <GameMatrix />
        <WinnerModal />
      </Box>
    </Layout>
  )
}

export default Game
