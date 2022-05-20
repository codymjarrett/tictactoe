import React from 'react'
import type { NextPage } from 'next'
import { useAppSelector } from '../hooks'
import styled from 'styled-components'

import { Box, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import Layout from '../components/Layout'

import { selectMarkerTurn } from '../selectors'

import { TypeMarkerSelection, TypePlayer } from '../types'

const MarkerHoverButton = styled.button`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: center;

  transition: hover 2s ease-in-out;
  &:hover {
    animation: backgroundIMG 200ms ease-in;
    animation-fill-mode: forwards;
  }

  @keyframes backgroundIMG {
    100% {
      background-image: ${({ marker }) =>
        marker === TypeMarkerSelection.CIRCLE
          ? "url('/circle.svg')"
          : "url('/circle.svg')"};
    }
  }
`

const NextMarkerOrder = ({
  markerTurn,
}: {
  markerTurn: TypeMarkerSelection
}) => {
  const isCross = markerTurn === TypeMarkerSelection.CROSS

  return (
    <GridItem>
      <HStack spacing="12px" height="full" alignItems="flex-end">
        <Box>
          <Image
            src={isCross ? '/cross.svg' : '/circle.svg'}
            width={35}
            height={35}
            alt="X"
          />
        </Box>
        <Box>
          <Image
            src={isCross ? '/circle.svg' : '/cross.svg'}
            width={35}
            height={35}
            alt="O"
          />
        </Box>
      </HStack>
    </GridItem>
  )
}

const GameMatrixHeader = () => {
  const markerTurn = useAppSelector((state) => selectMarkerTurn(state))
  const isCross = markerTurn === TypeMarkerSelection.CROSS
  console.log({ markerTurn })
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
      <GridItem
        bg="app.darkSilver"
        borderRadius="xl"
        w={14}
        style={{ boxShadow: '#6B8997 0px 5px 0px -1px' }}
        ml="auto"
      >
        <HStack alignItems="center" height="full" justifyContent="center">
          <Image src="/redo.svg" width={22} height={22} alt="redo" />
        </HStack>
      </GridItem>
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
  const matrix = useAppSelector((state) => state.app.matrix)
  const markerTurn = useAppSelector((state) => selectMarkerTurn(state))

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
          <MarkerHoverButton marker={markerTurn} />
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
      </Box>
    </Layout>
  )
}

export default Game
