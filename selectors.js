import { createSelector } from '@reduxjs/toolkit'

const selectTurn = (state) => state?.app.turn
const selectPlayerOneMarker = (state) => state?.app.playerOne
const selectPlayerTwoMarker = (state) => state?.app.playerTwo

import { TypePlayer } from './types'

export const selectMarkerTurn = createSelector(
  selectTurn,
  selectPlayerOneMarker,
  selectPlayerTwoMarker,
  (turn, playerOneMarker, playerTwoMarker) => {
    console.log(`turn is ${turn}`)
    if (turn === TypePlayer.PLAYER_ONE) {
      return playerOneMarker
    }

    return playerTwoMarker
  },
)
