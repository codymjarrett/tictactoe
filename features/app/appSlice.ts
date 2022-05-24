import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeMarkerType, TypePlayer, TypeMarkerState } from '../../types'
import isNumber from 'lodash.isnumber'

import { determineIfPermutationIsFilled } from '../../utils'

// for debugging purposes
import { current } from '@reduxjs/toolkit'

import {
  AppState,
  MakeBoardSelectionPayloadAction,
  HoverRedoMarkerPayloadAction,
} from './types'

const initialState: AppState = {
  gameStarted: false,
  initialMakerSelection: TypeMarkerType.CROSS,
  playerOne: '',
  playerTwo: '',
  matrix: [null, null, null, null, null, null, null, null, null],
  turn: null,
  stack: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    chooseMakerSelection: (state, action: PayloadAction<TypeMarkerType>) => {
      state.initialMakerSelection = action.payload
    },
    initializeGame: (state) => {
      state.gameStarted = true
      state.playerOne = state.initialMakerSelection
      state.playerTwo =
        state.initialMakerSelection === TypeMarkerType.CROSS
          ? TypeMarkerType.CIRCLE
          : TypeMarkerType.CROSS

      state.turn =
        state.playerOne === TypeMarkerType.CROSS
          ? TypePlayer.PLAYER_ONE
          : TypePlayer.PLAYER_TWO
    },
    makeBoardSelection: (
      state,
      action: PayloadAction<MakeBoardSelectionPayloadAction>,
    ) => {
      const { id, type, previousPlayIndex } = action.payload
      state.matrix[id] = { id, type, state: TypeMarkerState.INITIAL }
      state.stack.push(id)

      if (isNumber(previousPlayIndex)) {
        const previousPlay = state.matrix.find(
          (i) => i?.id === previousPlayIndex,
        )
        if (previousPlay) {
          previousPlay.state = TypeMarkerState.FINAL
        }
      }
    },
    goToNextTurn: (state) => {
      if (state.turn === TypePlayer.PLAYER_ONE) {
        state.turn = TypePlayer.PLAYER_TWO
      } else {
        state.turn = TypePlayer.PLAYER_ONE
      }
    },
    hoverInRedoMarkerAction: (
      state,
      action: PayloadAction<HoverRedoMarkerPayloadAction>,
    ) => {
      const { previousPlayIndex } = action.payload
      const previousPlay = state.matrix.find((i) => i?.id === previousPlayIndex)

      if (previousPlay) {
        previousPlay.state = TypeMarkerState.PENDING_REDO
      }
    },
    hoverOutRedoMarkerAction: (
      state,
      action: PayloadAction<HoverRedoMarkerPayloadAction>,
    ) => {
      const { previousPlayIndex } = action.payload
      const previousPlay = state.matrix.find((i) => i?.id === previousPlayIndex)

      if (previousPlay) {
        previousPlay.state = TypeMarkerState.INITIAL
      }
    },
    executeRedo: (
      state,
      action: PayloadAction<HoverRedoMarkerPayloadAction>,
    ) => {
      const { previousPlayIndex } = action.payload

      //this should be the last index in the stack so...
      state.stack.pop()
      // immer is wild for this one
      state.matrix[previousPlayIndex] = null

      // reset the turn to be ther previous turn
      const currentTurn = state.turn
      state.turn =
        currentTurn === TypePlayer.PLAYER_ONE
          ? TypePlayer.PLAYER_TWO
          : TypePlayer.PLAYER_ONE
    },
    determineAWin: (state) => {
      determineIfPermutationIsFilled(state.matrix)
    },
  },
})

export const {
  chooseMakerSelection,
  initializeGame,
  makeBoardSelection,
  goToNextTurn,
  hoverInRedoMarkerAction,
  hoverOutRedoMarkerAction,
  executeRedo,
  determineAWin,
} = appSlice.actions

export default appSlice.reducer
