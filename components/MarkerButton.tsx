import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'

import {
  selectMarkerTurn,
  selectMatrix,
  selectPreviousPlayIndex,
} from '../selectors'
import {
  makeBoardSelection,
  goToNextTurn,
  determineAWin,
} from '../features/app/appSlice'

const MarkerButton = ({
  children,
  matrixId,
}: {
  children: React.ReactNode
  matrixId: number
}) => {
  const [shouldShow, setShouldShow] = React.useState(false)
  const matrix = useAppSelector(selectMatrix)

  const dispatch = useAppDispatch()

  const marker = useAppSelector(selectMarkerTurn)
  const previousPlayIndex = useAppSelector(selectPreviousPlayIndex)

  const handleBoardSelection = (index: number) => {
    dispatch(
      makeBoardSelection({
        type: marker,
        id: index,
        previousPlayIndex,
      }),
    )
    dispatch(determineAWin())
    // I probably should stop being lazy and avoid calling this action if a winner is determined but it really doesn't matter
    dispatch(goToNextTurn())
  }

  return (
    <React.Fragment>
      <button
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => handleBoardSelection(matrixId)}
      >
        {children}
      </button>
    </React.Fragment>
  )
}

export default MarkerButton
