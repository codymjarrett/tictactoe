import { TypeMarkerType, TypePlayer, TypeMarker } from '../../types'

export interface AppState {
  initialMakerSelection: TypeMarkerType | null
  playerOne: TypeMarkerType | ''
  playerTwo: TypeMarkerType | ''
  matrix: Array<TypeMarker | null>
  turn: TypePlayer.PLAYER_ONE | TypePlayer.PLAYER_TWO | null
  stack: number[] | []
}

export interface MakeBoardSelectionPayloadAction extends TypeMarker {
  previousPlayIndex: number | null
}

export interface HoverRedoMarkerPayloadAction {
  previousPlayIndex: number
}
