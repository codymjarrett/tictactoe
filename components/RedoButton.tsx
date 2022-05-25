import { GridItem, HStack, Image, Tooltip } from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../hooks'
import {
  selectPreviousPlayIndex,
  selectStack,
  selectMatrix,
} from '../selectors'

import {
  hoverInRedoMarkerAction,
  hoverOutRedoMarkerAction,
  executeRedo,
} from '../features/app/appSlice'

import { TypeMarkerState } from '../types'

const RedoButton = () => {
  const previousPlayIndex = useAppSelector(selectPreviousPlayIndex)
  const matrix = useAppSelector(selectMatrix)
  const stack = useAppSelector(selectStack)

  const previousPlayState = matrix[previousPlayIndex]?.state
  const isFinalState = previousPlayState === TypeMarkerState.FINAL

  const dispatch = useAppDispatch()

  const handleOnMouseEnter = () => {
    if (!stack.length || isFinalState) {
      return
    }
    dispatch(hoverInRedoMarkerAction({ previousPlayIndex }))
  }

  const handleOnMouseLeave = () => {
    if (!stack.length || isFinalState) {
      return
    }
    dispatch(hoverOutRedoMarkerAction({ previousPlayIndex }))
  }
  const handleOnClick = () => {
    if (!stack.length || isFinalState) {
      return
    }
    dispatch(executeRedo({ previousPlayIndex }))
  }

  const getLabel = () => {
    if (!stack.length) {
      return "There's nothing to redo"
    }

    return 'Redo play'
  }
  return (
    <GridItem
      bg="app.darkSilver"
      borderRadius="xl"
      w={14}
      style={{ boxShadow: '#6B8997 0px 5px 0px -1px' }}
      ml="auto"
    >
      <Tooltip label={getLabel()} placement="top">
        <button
          style={{ width: '100%', height: '100%' }}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onClick={handleOnClick}
          disabled={isFinalState}
        >
          <HStack alignItems="center" height="full" justifyContent="center">
            <Image src="/redo.svg" boxSize="22px" alt="redo" />
          </HStack>
        </button>
      </Tooltip>
    </GridItem>
  )
}

export default RedoButton
