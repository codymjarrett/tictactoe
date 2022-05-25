import { TypeMarkerType, TypeMarkerState } from './types'

export const MARKERMAP = {
  [TypeMarkerType.CIRCLE]: '/circle.svg',
  [TypeMarkerType.CROSS]: '/cross.svg',
  [`${TypeMarkerState.INITIAL}_${TypeMarkerType.CIRCLE}`]: '/circle.svg',
  [`${TypeMarkerState.INITIAL}_${TypeMarkerType.CROSS}`]: '/cross.svg',
  [`${TypeMarkerState.FINAL}_${TypeMarkerType.CIRCLE}`]: '/circle.svg',
  [`${TypeMarkerState.FINAL}_${TypeMarkerType.CROSS}`]: '/cross.svg',
  [`${TypeMarkerState.PENDING_REDO}_${TypeMarkerType.CIRCLE}`]:
    '/redo-circle.svg',
  [`${TypeMarkerState.PENDING_REDO}_${TypeMarkerType.CROSS}`]:
    '/redo-cross.svg',
}
