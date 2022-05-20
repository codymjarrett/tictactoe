import { Box, Flex, Text } from '@chakra-ui/react'

const PlayerButton = ({
  onMarkerSelection,
}: {
  onMarkerSelection: () => void
}) => {
  return (
    <Box
      bg="app.lightBlue"
      w="460px"
      h="67px"
      borderRadius="xl"
      style={{ boxShadow: '#118C87 1px 10px 0px -1px' }}
      _hover={{ backgroundColor: 'app.semiLightBlue' }}
    >
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
