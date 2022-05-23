export enum TypePlayer {
  PLAYER_ONE = 'PLAYER_ONE',
  PLAYER_TWO = 'PLAYER_TWO',
}

export enum TypeMarkerState {
  FINAL = 'FINAL',
  REDO = 'REDO',
}

export enum TypeMarkerType {
  CROSS = 'CROSS',
  CIRCLE = 'CIRCLE',
}

export interface TypeMarker {
  type: TypeMarkerType
  state: TypeMarkerState
  id: number
}
