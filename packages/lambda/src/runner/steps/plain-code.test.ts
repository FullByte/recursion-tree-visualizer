import { FunctionData, SupportedLanguages } from '../../types'
import translateToPlainCode from './plain-code'

const examples: Record<SupportedLanguages, FunctionData>[] = [
  {
    node: {
      globalVariables: [{ name: 'arr', value: '[1,3,4,5,2,10]' }],
      params: [
        { name: 'i', initialValue: '0' },
        { name: 's', initialValue: '7' },
      ],
      body: [
        'if (s == 0) return 1',
        'if (i == arr.length || s < 0) return 0',
        '',
        'return fn(i+1, s) + fn(i+1, s-arr[i])',
      ].join('\n'),
    },
    python: {
      globalVariables: [{ name: 'arr', value: '[1,3,4,5,2,10]' }],
      params: [
        { name: 'i', initialValue: '0' },
        { name: 's', initialValue: '7' },
      ],
      body: [
        'if (s == 0) return 1',
        'if (i == arr.length or s < 0) return 0',
        '',
        'return fn(i+1, s) + fn(i+1, s-arr[i])',
      ].join('\n'),
    },
  },
]

describe('For `node` language', () => {
  it('Example 0', () => {
    const plainCode = translateToPlainCode(examples[0].node, 'node', {
      memoize: false,
    })
    expect(plainCode).toEqual(
      [
        'const arr = [1,3,4,5,2,10]',
        '',
        'function _fn(i, s) {',
        '  if (s == 0) return 1',
        '  if (i == arr.length || s < 0) return 0',
        '  ',
        '  return fn(i+1, s) + fn(i+1, s-arr[i])',
        '}',
        '',
        'const fnParamsValues = [0, 7]',
        'const memoize = false',
      ].join('\n')
    )
  })
})

describe('For `python` language', () => {
  it('Example 0', () => {
    const plainCode = translateToPlainCode(examples[0].python, 'python', {
      memoize: false,
    })
    expect(plainCode).toEqual(
      [
        'arr = [1,3,4,5,2,10]',
        '',
        'def _fn(i, s):',
        '  if (s == 0) return 1',
        '  if (i == arr.length or s < 0) return 0',
        '  ',
        '  return fn(i+1, s) + fn(i+1, s-arr[i])',
        '',
        'fnParamsValues = [0, 7]',
        'memoize = False',
      ].join('\n')
    )
  })
})
