import { createSelector } from '@reduxjs/toolkit'
import { TypeMarkerType, TypePlayer } from './types'
import type { RootState } from './store'

export const selectGameStarted = (state: RootState) => state?.app.gameStarted
export const selectTurn = (state: RootState) => state?.app.turn
export const selectPlayerOneMarker = (state: RootState): TypeMarkerType | '' =>
  state?.app.playerOne
export const selectPlayerTwoMarker = (state: RootState): TypeMarkerType | '' =>
  state?.app.playerTwo
export const selectMatrix = (state: RootState) => state?.app.matrix
export const selectPreviousPlayIndex = (state: RootState) =>
  state?.app.stack[state?.app.stack.length - 1]
export const selectStack = (state: RootState) => state?.app.stack
export const selectMatrixItem = (index: number) => (state: RootState) =>
  state?.app.matrix[index]

export const selectMarkerTurn = createSelector(
  selectTurn,
  selectPlayerOneMarker,
  selectPlayerTwoMarker,
  (turn, playerOneMarker, playerTwoMarker) => {
    if (turn === TypePlayer.PLAYER_ONE) {
      return playerOneMarker
    }

    return playerTwoMarker
  },
)
