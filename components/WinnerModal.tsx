import React from 'react'
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../hooks'
import { quitGame } from '../features/app/appSlice'
import { selectWinner, selectWinnerDetermined } from '../selectors'
import {
  Box,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react'

import { TypeMarkerType } from '../types'

const WinnerModal = () => {
  const dispatch = useAppDispatch()
  const winner = useAppSelector(selectWinner)
  const hasWinnerDetermined = useAppSelector(selectWinnerDetermined)

  const isCross = winner === TypeMarkerType.CROSS

  const handleQuit = () => {
    dispatch(quitGame())
  }
  const handleNextRound = () => {}

  return (
    <Modal isOpen={hasWinnerDetermined} isCentered>
      <ModalOverlay />
      <ModalContent
        // position="absolute"
        // left="0"
        // right="0"
        h="260px"
        maxW="100%"
        bg="app.SemiDarkNavy"
      >
        <ModalBody mt={12}>
          <Center>
            <Image
              src={isCross ? '/cross.svg' : '/circle.svg'}
              alt={isCross ? 'X' : 'O'}
              width={60}
              height={60}
            />
            <Text
              fontSize={50}
              ml={6}
              color={isCross ? 'app.lightBlue' : 'app.yellow'}
              fontWeight="bold"
              letterSpacing={2}
            >
              {'takes the round'.toUpperCase()}
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter>
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
