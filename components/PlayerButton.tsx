import { Box, Flex, Text } from '@chakra-ui/react'

const PlayerButton = ({
  onMarkerSelection,
}: {
  onMarkerSelection: () => void
}) => {
  return (
    <Box bg="app.lightBlue" w="460px" h="67px" borderRadius="xl">
      <Flex alignItems="center" justifyContent="center" h="full">
        <button onClick={onMarkerSelection}>
          <Text color="app.darkNavy" fontWeight="bold" fontSize="lg">
            {'New Game (VS Player)'.toUpperCase()}
          </Text>
        </button>
      </Flex>
    </Box>
  )
}

export default PlayerButton
