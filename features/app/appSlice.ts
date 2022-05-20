import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { TypeMarkerSelection } from '../../types'

interface AppState {
  initialMakerSelection: TypeMarkerSelection | null
  playerOne: TypeMarkerSelection | null
  playerTwo: TypeMarkerSelection | null
  matrix: Array<null | 'X' | 'O'>
}

const initialState: AppState = {
  initialMakerSelection: null,
  playerOne: null,
  playerTwo: null,
  matrix: [null, null, null, null, null, null, null, null, null],
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
    },
  },
})

export const { chooseMakerSelection, initializeGame } = appSlice.actions

export default appSlice.reducer
