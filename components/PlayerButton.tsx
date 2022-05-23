import { Box, Flex, Text } from '@chakra-ui/react'
import { useAppDispatch } from '../hooks'
import { useRouter } from 'next/router'

import { initializeGame } from '../features/app/appSlice'

const PlayerButton = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleOnPlayButton = () => {
    dispatch(initializeGame())
    router.push('/game')
  }

  return (
    <Box
      bg="app.lightBlue"
      w="460px"
      h="67px"
      borderRadius="xl"
      style={{ boxShadow: '#118C87 0px 5px 0px -1px' }}
      _hover={{ backgroundColor: 'app.semiLightBlue' }}
    >
      <Flex alignItems="center" justifyContent="center" h="full">
        <button onClick={handleOnPlayButton} style={{ width: '100%' }}>
          <Text color="app.darkNavy" fontWeight="bold" fontSize="lg">
            {'New Game (VS Player)'.toUpperCase()}
          </Text>
        </button>
      </Flex>
    </Box>
  )
}

export default PlayerButton
