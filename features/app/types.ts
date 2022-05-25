import { TypeMarkerType, TypePlayer, TypeMarker } from '../../types'

export interface AppState {
  gameStarted: boolean
  winnerDetermined: boolean
  winner: TypeMarkerType | 'tie' | ''
  initialMakerSelection: TypeMarkerType | ''
  playerOne: TypeMarkerType | ''
  playerTwo: TypeMarkerType | ''
  matrix: Array<TypeMarker | null>
  turn: TypePlayer.PLAYER_ONE | TypePlayer.PLAYER_TWO | null
  stack: number[]
}

export interface MakeBoardSelectionPayloadAction {
  type: TypeMarkerType | ''
  id: number
  previousPlayIndex: number | null
}

export interface HoverRedoMarkerPayloadAction {
  previousPlayIndex: number
}
