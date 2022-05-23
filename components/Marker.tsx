import React from 'react'
import Image from 'next/image'
import { useAppSelector } from '../hooks'
import { MARKERMAP } from '../constants'

import { selectMatrixItem } from '../selectors'

import { TypeMarkerType, TypeMarkerState } from '../types'

const Marker = ({ matrixId }: { matrixId: number }) => {
  const matrixItem = useAppSelector(selectMatrixItem(matrixId))

  if (matrixItem !== null) {
    const matrixItemState = matrixItem?.state
    const matrixItemType = matrixItem?.type

    const marker = `${matrixItemState}_${matrixItemType}`

    return (
      <React.Fragment>
        <Image
          src={MARKERMAP[marker]}
          width="60px"
          height="60px"
          // alt={isCross ? 'X' : 'O'}
        />
      </React.Fragment>
    )
  }

  return null
}

export default Marker
