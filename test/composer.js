import { reversePalette } from '../src/composer'

test('reversePalette', () => {
  const palette = {
    key1: [1, 2, 3],
    key2: [3, 2, 1]
  }
  expect(reversePalette(palette)).toEqual({
    key1: [3, 2, 1],
    key2: [1, 2, 3]
  })
})
