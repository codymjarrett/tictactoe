import React from 'react'
import type { NextPage } from 'next'
import { useAppSelector, useAppDispatch } from '../hooks'
import styled from 'styled-components'

import { Box, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import Layout from '../components/Layout'

import { selectMarkerTurn } from '../selectors'
import { makeBoardSelection } from '../features/app/appSlice'

import { TypeMarkerSelection, TypePlayer } from '../types'

interface MarkerHoverButtonProps {
  marker: TypeMarkerSelection
  isSelected: boolean
}

const MARKERMAP = {
  [TypeMarkerSelection.CIRCLE]: "url('/circle.svg')",
  [TypeMarkerSelection.CROSS]: "url('/cross.svg')",
}

const MarkerHoverButton = styled.button<MarkerHoverButtonProps>`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: center;

  background-image: ${({ isSelected, marker }) => {
    console.log({ isSelected })

    return isSelected && MARKERMAP[marker]
  }};

  &:hover {
    animation: backgroundIMG 100ms ease-in 100ms;
    animation-fill-mode: forwards;
  }

  @keyframes backgroundIMG {
    100% {
      background-image: ${({ marker }) => MARKERMAP[marker]};
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
  const dispatch = useAppDispatch()
  const matrix = useAppSelector((state) => state.app.matrix)
  const markerTurn = useAppSelector((state) => selectMarkerTurn(state))

  console.log({ matrix })

  const handleBoardSelection = (index, marker) => {
    dispatch(makeBoardSelection({ index, marker }))
  }

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
          <MarkerHoverButton
            marker={markerTurn}
            isSelected={matrix[idx] !== null}
            onClick={() => handleBoardSelection(idx, markerTurn)}
          />
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
