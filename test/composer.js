import { coolors, reversePalette } from '../src/composer'

test('coolors', () => {
  expect(coolors('https://coolors.co/1976d2-2196f3-71bcf7-97cef9-c2e2fb'))
    .toEqual(['#1976d2', '#2196f3', '#71bcf7', '#97cef9', '#c2e2fb'])
})

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
