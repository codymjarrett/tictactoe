import React from 'react'
import type { NextPage } from 'next'
import { useAppSelector, useAppDispatch } from '../hooks'
import styled, { css } from 'styled-components'

import { Box, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import Layout from '../components/Layout'

import { selectMarkerTurn } from '../selectors'
import { makeBoardSelection, goToNextTurn } from '../features/app/appSlice'

import { TypeMarkerType, TypeMarkerState } from '../types'

interface ButtonProps {
  marker: TypeMarkerType
  isSelected: boolean
}

const MARKERMAP = {
  [TypeMarkerType.CIRCLE]: '/circle.svg',
  [TypeMarkerType.CROSS]: '/cross.svg',
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: center;
  background-image: none;

  /* TODO come back to this */

  /* ${({ isSelected, marker }) =>
    !isSelected &&
    css`
      &:hover {
        animation: backgroundIMG 100ms ease-in 100ms;
        animation-fill-mode: forwards;
      }
      @keyframes backgroundIMG {
        100% {
          background-image: url(${MARKERMAP[marker]});
        }
      }
    `} */
`

const NextMarkerOrder = ({ markerTurn }: { markerTurn: TypeMarkerType }) => {
  const isCross = markerTurn === TypeMarkerType.CROSS

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

const SelectedMarker = ({ matrixId }: { matrixId: number }) => {
  const matrix = useAppSelector((state) => state.app.matrix)
  const marker = matrix[matrixId]

  if (marker !== null) {
    const markerType = marker?.type

    const isCross = markerType === TypeMarkerType.CROSS

    return (
      <React.Fragment>
        <Image
          src={MARKERMAP[markerType]}
          width="60px"
          height="60px"
          alt={isCross ? 'X' : 'O'}
        />
      </React.Fragment>
    )
  }

  return null
}

const MarkerHoverButton = ({
  children,
  matrixId,
}: {
  children: React.ReactNode
  matrixId: number
}) => {
  const matrix = useAppSelector((state) => state.app.matrix)

  const dispatch = useAppDispatch()

  const marker = useAppSelector((state) => selectMarkerTurn(state))

  const handleBoardSelection = (index: number) => {
    dispatch(
      makeBoardSelection({
        type: marker,
        state: TypeMarkerState.FINAL,
        id: index,
      }),
    )
    dispatch(goToNextTurn())
  }

  return (
    <React.Fragment>
      <Button
        onClick={() => handleBoardSelection(matrixId)}
        onMouseOver={() => console.log({ marker })}
        marker={marker}
        isSelected={matrix[matrixId] !== null}
      >
        {children}
      </Button>
    </React.Fragment>
  )
}

const GameMatrixHeader = () => {
  const markerTurn = useAppSelector((state) => selectMarkerTurn(state))
  const isCross = markerTurn === TypeMarkerType.CROSS
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
            <SelectedMarker matrixId={idx} />
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
      </Box>
    </Layout>
  )
}

export default Game
