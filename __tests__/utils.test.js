import {
  determineIfPermutationIsFilled,
  determineIfFilledPermutationIsOneMarkerType,
} from '../utils'

describe('determineIfPermutationIsFilled', () => {
  const testCases = [
    {
      case: [
        { type: 'CROSS' },
        { type: 'CROSS' },
        { type: 'CROSS' },
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      result: 'CROSS',
    },

    {
      case: [null, null, null, null, null, null, null, null, null],
      result: undefined,
    },
    {
      case: [
        { type: 'CROSS' },
        null,
        null,
        null,
        { type: 'CROSS' },
        null,
        null,
        null,
        { type: 'CROSS' },
      ],
      result: 'CROSS',
    },
    {
      case: [
        null,
        null,
        { type: 'CIRCLE' },
        null,
        { type: 'CIRCLE' },
        null,
        { type: 'CIRCLE' },
        null,
        null,
      ],
      result: 'CIRCLE',
    },

    {
      case: [
        { type: 'CROSS' },
        null,
        { type: 'CIRCLE' },
        null,
        { type: 'CROSS' },
        null,
        { type: 'CIRCLE' },
        null,
        { type: 'CROSS' },
      ],
      result: 'CROSS',
    },
  ]

  it.each(testCases)('should pass as expected with $result result', (t) => {
    expect(determineIfPermutationIsFilled(t.case)).toBe(t.result)
  })
})
describe('determineIfFilledPermutationIsOneMarkerType', () => {
  const testCases = [
    {
      case: [{ type: 'CROSS' }, { type: 'CROSS' }, { type: 'CROSS' }],
      result: 'CROSS',
    },
    {
      case: [null, null, null, null, null, null, null, null, null],
      result: false,
    },
    {
      case: [{ type: 'CIRCLE' }, { type: 'CIRCLE' }, { type: 'CIRCLE' }],
      result: 'CIRCLE',
    },
    {
      case: [
        { type: 'CROSS' },
        null,
        { type: 'CIRCLE' },
        null,
        { type: 'CROSS' },
        null,
        { type: 'CIRCLE' },
        null,
        { type: 'CROSS' },
      ],
      result: false,
    },
  ]

  it.each(testCases)('should return $result as the result', (t) => {
    expect(determineIfFilledPermutationIsOneMarkerType(t.case)).toBe(t.result)
  })
})
