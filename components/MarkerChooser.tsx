import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { chooseMakerSelection } from '../features/app/appSlice'

import { Box, Center, Flex, Image } from '@chakra-ui/react'

import { TypeMarkerType } from '../types'

const MarkerChooser = () => {
  const dispatch = useAppDispatch()

  const isCross = useAppSelector(
    (state) => state.app.initialMakerSelection === TypeMarkerType.CROSS,
  )

  const handleDispatchMarkerSelection = (marker: TypeMarkerType) => {
    dispatch(chooseMakerSelection(marker))
  }

  return (
    <React.Fragment>
      <Center>
        <Box bg="app.darkNavy" borderRadius="xl" w="90%" height="72px">
          <Flex alignItems="center" justifyContent="space-around" h="full">
            <Flex
              justifyContent="center"
              width="half"
              {...(isCross && {
                bg: 'app.darkSilver',
                borderRadius: 'xl',
                m: 2,
                p: 1,
              })}
            >
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() =>
                  handleDispatchMarkerSelection(TypeMarkerType.CROSS)
                }
              >
                <Image
                  src={isCross ? '/dark-cross.svg' : '/silver-cross.svg'}
                  boxSize="30px"
                  alt="X"
                />
              </button>
            </Flex>
            <Flex
              justifyContent="center"
              width="half"
              {...(!isCross && {
                bg: 'app.darkSilver',
                borderRadius: 'xl',
                m: 2,
                p: 1,
              })}
            >
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() =>
                  handleDispatchMarkerSelection(TypeMarkerType.CIRCLE)
                }
              >
                <Image
                  src={!isCross ? '/dark-circle.svg' : '/silver-circle.svg'}
                  boxSize="30px"
                  alt="O"
                />
              </button>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </React.Fragment>
  )
}

export default MarkerChooser
