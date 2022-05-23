import Image from 'next/image'
import { Box, GridItem, HStack } from '@chakra-ui/react'
import { TypeMarkerType } from '../types'

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

export default NextMarkerOrder
