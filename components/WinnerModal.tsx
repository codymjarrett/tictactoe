import React from 'react'

import { useAppSelector, useAppDispatch } from '../hooks'
import { resetGame, goToNextRound } from '../features/app/appSlice'
import { selectWinner, selectWinnerDetermined } from '../selectors'
import {
  Box,
  Center,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
} from '@chakra-ui/react'

import { TypeMarkerType } from '../types'

const getWinnerContent = (winner: TypeMarkerType | 'tie' | '') => {
  const isCross = winner === TypeMarkerType.CROSS

  return (
    <Center>
      {winner === 'tie' ? (
        <Text
          fontSize={{ base: 25, md: 50 }}
          ml={6}
          color="app.silver"
          fontWeight="bold"
          letterSpacing={2}
        >
          {'round tied'.toUpperCase()}
        </Text>
      ) : (
        <React.Fragment>
          <Image
            src={isCross ? '/cross.svg' : '/circle.svg'}
            alt={isCross ? 'X' : 'O'}
            boxSize={{ base: 45, md: 65 }}
          />
          <Text
            fontSize={{ base: 25, md: 50 }}
            ml={6}
            color={isCross ? 'app.lightBlue' : 'app.yellow'}
            fontWeight="bold"
            letterSpacing={2}
          >
            {'takes the round'.toUpperCase()}
          </Text>
        </React.Fragment>
      )}
    </Center>
  )
}

const WinnerModal = () => {
  const dispatch = useAppDispatch()
  const winner = useAppSelector(selectWinner)
  const hasWinnerDetermined = useAppSelector(selectWinnerDetermined)

  const handleQuit = () => {
    dispatch(resetGame())
  }
  const handleNextRound = () => {
    dispatch(goToNextRound())
  }

  return (
    <Modal isOpen={hasWinnerDetermined} isCentered onClose={handleQuit}>
      <ModalOverlay />
      <ModalContent h="260px" maxW="100%" bg="app.SemiDarkNavy">
        <ModalBody mt={{ base: 20, md: 12 }}>
          {getWinnerContent(winner)}
        </ModalBody>

        <ModalFooter pb={8}>
          <Center w="full">
            <Box
              w="76px"
              h="52px"
              mr={6}
              bg="app.silver"
              shadow="#A8BFC9 0px 5px 0px -1px"
              borderRadius="xl"
            >
              <button
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onClick={handleQuit}
              >
                {'quit'.toUpperCase()}
              </button>
            </Box>
            <Box
              w="146px"
              h="52px"
              bg="app.yellow"
              shadow="#CC8B13 0px 5px 0px -1px"
              borderRadius="xl"
            >
              <button
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onClick={handleNextRound}
              >
                {'next round'.toUpperCase()}
              </button>
            </Box>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WinnerModal
