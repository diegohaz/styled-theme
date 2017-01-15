// @flow
import type { Palette } from './types'

/**
 * Revert the palette
 * @example
 * reversePalette({ primary: ['red', 'yellow', 'green'] })
 * // { primary: ['green', 'yellow', 'red'] }
 */
export const reversePalette = (palette: Palette): Palette =>
  Object.keys(palette).reduce((newPalette, key) => ({
    ...newPalette,
    [key]: [...palette[key]].reverse()
  }), {})
