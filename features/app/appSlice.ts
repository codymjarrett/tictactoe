import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { TypeMarkerSelection, TypePlayer } from '../../types'

interface AppState {
  initialMakerSelection: TypeMarkerSelection | null
  playerOne: TypeMarkerSelection | null
  playerTwo: TypeMarkerSelection | null
  matrix: Array<null | 'X' | 'O'>
  turn: TypePlayer.PLAYER_ONE | TypePlayer.PLAYER_TWO | null
}

const initialState: AppState = {
  initialMakerSelection: TypeMarkerSelection.CROSS,
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
      action: PayloadAction<TypeMarkerSelection | null>,
    ) => {
      state.initialMakerSelection = action.payload
    },
    initializeGame: (state) => {
      state.playerOne = state.initialMakerSelection
      state.playerTwo =
        state.initialMakerSelection === TypeMarkerSelection.CROSS
          ? TypeMarkerSelection.CIRCLE
          : TypeMarkerSelection.CROSS

      state.turn =
        state.playerOne === TypeMarkerSelection.CROSS
          ? TypePlayer.PLAYER_ONE
          : TypePlayer.PLAYER_TWO
    },
    makeBoardSelection: (state, action) => {
      state.matrix[action.payload.index] = action.payload.marker
    },
  },
})

export const { chooseMakerSelection, initializeGame, makeBoardSelection } =
  appSlice.actions

export default appSlice.reducer
