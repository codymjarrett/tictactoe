import { TypeMarkerType, TypePlayer, TypeMarker } from './types'

/* 
      there are 8 win permutations
      0, 1, 2,
      3, 4, 5
      6, 7, 8

      1. [0, 1, 2]
      2. [3, 4, 5]
      3. [6, 7, 8]
      4. [0, 3, 6]
      5. [1, 4, 7]
      6. [2, 5, 8]
      7. [0, 4, 8]
      8. [2, 4, 6] 
    */
const winPermutations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const determineIfPermutationIsFilled = (
  matrix: Array<TypeMarker | null>,
) => {
  for (let i = 0; i < winPermutations.length; i++) {
    const currentPermutation = winPermutations[i]
    const matrixPermutationItems = currentPermutation.map(
      (number) => matrix[number],
    )
    if (matrixPermutationItems.every((matrixItem) => matrixItem !== null)) {
      const isFilledPermutationOfOneMarkerType =
        determineIfFilledPermutationIsOneMarkerType(matrixPermutationItems)
      if (!isFilledPermutationOfOneMarkerType) {
        continue
      }
      return isFilledPermutationOfOneMarkerType
    }
  }
}

const determineIfFilledPermutationIsOneMarkerType = (
  matrixPermutationItems: Array<TypeMarker | null>,
) => {
  if (
    matrixPermutationItems.every((matrixItem) => matrixItem?.type === 'CROSS')
  ) {
    console.log('CROSS won')
    return true
  }
  if (
    matrixPermutationItems.every((matrixItem) => matrixItem?.type === 'CIRCLE')
  ) {
    console.log('CIRCLE won')
    return
  }

  return false
}
