import { Box, GridItem, HStack, Image } from '@chakra-ui/react'
import { TypeMarkerType } from '../types'

const NextMarkerOrder = ({
  markerTurn,
}: {
  markerTurn: TypeMarkerType | ''
}) => {
  const isCross = markerTurn === TypeMarkerType.CROSS

  return (
    <GridItem>
      <HStack spacing="12px" height="full" alignItems="flex-end">
        <Box>
          <Image
            src={isCross ? '/cross.svg' : '/circle.svg'}
            boxSize="35px"
            alt="X"
          />
        </Box>
        <Box>
          <Image
            src={isCross ? '/circle.svg' : '/cross.svg'}
            boxSize="35px"
            alt="O"
          />
        </Box>
      </HStack>
    </GridItem>
  )
}

export default NextMarkerOrder
