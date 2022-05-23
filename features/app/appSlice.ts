import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeMarkerType, TypePlayer, TypeMarkerState } from '../../types'

import {
  AppState,
  MakeBoardSelectionPayloadAction,
  HoverRedoMarkerPayloadAction,
} from './types'

const initialState: AppState = {
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
      const { id, type, state: markerState, previousPlayIndex } = action.payload
      state.matrix[id] = { id, type, state: markerState }

      if (previousPlayIndex) {
        state.matrix[previousPlayIndex] = {
          ...state.matrix[previousPlayIndex],
          state: TypeMarkerState.FINAL,
        }
      }
      state.stack.push(id)
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
      console.log(`${previousPlayIndex} from slice`)
      state.matrix[previousPlayIndex] = {
        ...state.matrix[previousPlayIndex],
        state: TypeMarkerState.PENDING_REDO,
      }
    },
    hoverOutRedoMarkerAction: (
      state,
      action: PayloadAction<HoverRedoMarkerPayloadAction>,
    ) => {
      const { previousPlayIndex } = action.payload
      state.matrix[previousPlayIndex] = {
        ...state.matrix[previousPlayIndex],
        state: TypeMarkerState.INITIAL,
      }
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
} = appSlice.actions

export default appSlice.reducer
