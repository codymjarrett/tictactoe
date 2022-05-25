import React from 'react'
import { useAppSelector } from '../hooks'
import { MARKERMAP } from '../constants'

import { Image } from '@chakra-ui/react'

import { selectMatrixItem } from '../selectors'

import { TypeMarkerType, TypeMarkerState } from '../types'

const Marker = ({ matrixId }: { matrixId: number }) => {
  const matrixItem = useAppSelector(selectMatrixItem(matrixId))

  if (matrixItem !== null) {
    const matrixItemState = matrixItem?.state
    const matrixItemType = matrixItem?.type

    const marker = `${matrixItemState}_${matrixItemType}`

    const isCross = matrixItemType === TypeMarkerType.CROSS

    return (
      <React.Fragment>
        <Image
          src={MARKERMAP[marker]}
          boxSize="60px"
          alt={isCross ? 'X' : 'O'}
        />
      </React.Fragment>
    )
  }

  return null
}

export default Marker
