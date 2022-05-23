export enum TypePlayer {
  PLAYER_ONE = 'PLAYER_ONE',
  PLAYER_TWO = 'PLAYER_TWO',
}

export enum TypeMarkerState {
  INITIAL = 'INITIAL',
  FINAL = 'FINAL',
  PENDING_REDO = 'PENDING_REDO',
  REDO = 'REDO',
}

export enum TypeMarkerType {
  CROSS = 'CROSS',
  CIRCLE = 'CIRCLE',
}

export interface TypeMarker {
  type: TypeMarkerType | ''
  state: TypeMarkerState
  id: number
}
