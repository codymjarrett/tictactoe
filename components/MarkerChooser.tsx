import React from 'react'
import { TypeMarkerSelection } from '../types'

import Image from 'next/image'

import { Box, Center, Flex } from '@chakra-ui/react'

const MarkerChooser = ({
  marker,
  setMarker,
}: {
  marker: TypeMarkerSelection
  setMarker: (marker: TypeMarkerSelection) => void
}) => {
  const isCross = marker === TypeMarkerSelection.CROSS

  return (
    <React.Fragment>
      <Center>
        <Box bg="app.darkNavy" borderRadius="xl" width="412px" height="72px">
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
                style={{ width: '100%' }}
                onClick={() => setMarker(TypeMarkerSelection.CROSS)}
              >
                <Image
                  src={isCross ? '/dark-cross.svg' : '/silver-cross.svg'}
                  width={30}
                  height={30}
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
                style={{ width: '100%' }}
                onClick={() => setMarker(TypeMarkerSelection.CIRCLE)}
              >
                <Image
                  src={!isCross ? '/dark-circle.svg' : '/silver-circle.svg'}
                  width={30}
                  height={30}
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
