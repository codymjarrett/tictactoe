import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { TypeMarkerType, TypePlayer, TypeMarker } from '../../types'

interface AppState {
  initialMakerSelection: TypeMarkerType | null
  playerOne: TypeMarkerType | null
  playerTwo: TypeMarkerType | null
  matrix: Array<TypeMarker | null>
  turn: TypePlayer.PLAYER_ONE | TypePlayer.PLAYER_TWO | null
}

const initialState: AppState = {
  initialMakerSelection: TypeMarkerType.CROSS,
  playerOne: null,
  playerTwo: null,
  matrix: [null, null, null, null, null, null, null, null, null],
  turn: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    chooseMakerSelection: (
      state,
      action: PayloadAction<TypeMarkerType | null>,
    ) => {
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
    makeBoardSelection: (state, action) => {
      const { id } = action.payload
      state.matrix[id] = action.payload
    },
    goToNextTurn: (state) => {
      if (state.turn === TypePlayer.PLAYER_ONE) {
        state.turn = TypePlayer.PLAYER_TWO
      } else {
        state.turn = TypePlayer.PLAYER_ONE
      }
    },
  },
})

export const {
  chooseMakerSelection,
  initializeGame,
  makeBoardSelection,
  goToNextTurn,
} = appSlice.actions

export default appSlice.reducer
