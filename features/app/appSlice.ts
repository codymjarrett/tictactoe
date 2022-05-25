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
  winnerDetermined: false,
  winner: '',
  initialMakerSelection: TypeMarkerType.CROSS,
  playerOne: '',
  playerTwo: '',
  matrix: [null, null, null, null, null, null, null, null, null],
  turn: null,
  stack: [],
  playerOneWins: 0,
  playerTwoWins: 0,
  ties: 0,
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
      const determinedWinner = determineIfPermutationIsFilled(state.matrix)
      const isMatrixCompletelyFilled = state.matrix.every((i) => i !== null)

      if (isMatrixCompletelyFilled && !determinedWinner) {
        state.winnerDetermined = true
        state.winner = 'tie'
        // this feels so dirty
        state.ties++
        return
      }

      if (determinedWinner) {
        state.winnerDetermined = true
        state.winner = determinedWinner
        // I hate all these ifs but it is what it is

        if (determinedWinner === TypeMarkerType.CROSS) {
          if (state.playerOne === TypeMarkerType.CROSS) {
            state.playerOneWins++
          } else if (state.playerTwo === TypeMarkerType.CROSS) {
            state.playerTwoWins++
          }
        }
        if (determinedWinner === TypeMarkerType.CIRCLE) {
          if (state.playerOne === TypeMarkerType.CIRCLE) {
            state.playerOneWins++
          } else if (state.playerTwo === TypeMarkerType.CIRCLE) {
            state.playerTwoWins++
          }
        }
      }
    },
    resetGame: () => {
      // again weird - https://redux-toolkit.js.org/usage/immer-reducers#resetting-and-replacing-state
      return initialState
    },
    goToNextRound: (state) => {
      return {
        ...initialState,
        winnerDetermined: false,
        playerOneWins: state.playerOneWins,
        playerTwoWins: state.playerTwoWins,
        playerOne: state.playerOne,
        playerTwo: state.playerTwo,
        ties: state.ties,
        gameStarted: true,
        // because X always goes first
        turn:
          state.playerOne === TypeMarkerType.CROSS
            ? TypePlayer.PLAYER_ONE
            : TypePlayer.PLAYER_TWO,
        // initialMakerSelection:
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
  executeRedo,
  determineAWin,
  resetGame,
  goToNextRound,
} = appSlice.actions

export default appSlice.reducer
