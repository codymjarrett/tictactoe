import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import styled, { css } from 'styled-components'

import { selectMarkerTurn, selectPreviousPlayIndex } from '../selectors'
import { makeBoardSelection, goToNextTurn } from '../features/app/appSlice'
import { TypeMarkerType, TypeMarkerState } from '../types'
import { MARKERMAP } from '../constants'

interface ButtonProps {
  marker: TypeMarkerType
  isSelected: boolean
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: center;
  background-image: none;

  /* TODO come back to this */

  /* ${({ isSelected, marker }) =>
    !isSelected &&
    css`
      &:hover {
        animation: backgroundIMG 100ms ease-in 100ms;
        animation-fill-mode: forwards;
      }
      @keyframes backgroundIMG {
        100% {
          background-image: url(${MARKERMAP[marker]});
        }
      }
    `} */
`

const MarkerHoverButton = ({
  children,
  matrixId,
}: {
  children: React.ReactNode
  matrixId: number
}) => {
  const matrix = useAppSelector((state) => state.app.matrix)

  const dispatch = useAppDispatch()

  const marker = useAppSelector((state) => selectMarkerTurn(state))
  const previousPlayIndex = useAppSelector(selectPreviousPlayIndex)

  const handleBoardSelection = (index: number) => {
    dispatch(
      makeBoardSelection({
        type: marker,
        id: index,
        previousPlayIndex,
      }),
    )
    dispatch(goToNextTurn())
  }

  return (
    <React.Fragment>
      <Button
        onClick={() => handleBoardSelection(matrixId)}
        onMouseOver={() => console.log({ marker })}
        marker={marker}
        isSelected={matrix[matrixId] !== null}
      >
        {children}
      </Button>
    </React.Fragment>
  )
}

export default MarkerHoverButton
