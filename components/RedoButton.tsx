import { GridItem, HStack } from '@chakra-ui/react'
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../hooks'
import { selectPreviousPlayIndex, selectStack } from '../selectors'

import {
  hoverInRedoMarkerAction,
  hoverOutRedoMarkerAction,
} from '../features/app/appSlice'

const RedoButton = () => {
  const previousPlayIndex = useAppSelector(selectPreviousPlayIndex)
  const stack = useAppSelector(selectStack)

  const dispatch = useAppDispatch()

  const handleOnMouseEnter = () => {
    if (!stack.length) {
      return
    }
    dispatch(hoverInRedoMarkerAction({ previousPlayIndex }))
  }

  const handleOnMouseLeave = () => {
    if (!stack.length) {
      return
    }
    dispatch(hoverOutRedoMarkerAction({ previousPlayIndex }))
  }
  const handleOnClick = () => {}
  return (
    <GridItem
      bg="app.darkSilver"
      borderRadius="xl"
      w={14}
      style={{ boxShadow: '#6B8997 0px 5px 0px -1px' }}
      ml="auto"
    >
      <button
        style={{ width: '100%', height: '100%' }}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleOnClick}
      >
        <HStack alignItems="center" height="full" justifyContent="center">
          <Image src="/redo.svg" width={22} height={22} alt="redo" />
        </HStack>
      </button>
    </GridItem>
  )
}

export default RedoButton
