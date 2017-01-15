import get from 'lodash/get'
import at from 'lodash/at'
import values from 'lodash/values'
import difference from 'lodash/difference'
import theme from './theme'
import type { Theme, Tones, Font, Size } from './types'

type Props = {
  theme?: Theme
}

/**
 * Returns the value of props.theme[path] or styledTheme[path]
 * @example
 * const Button = styled.button`
 *  font-family: ${key('fonts.primary')};
 *  color: ${key(['colors', 'primary', 0])};
 * `
 */
export const key = (path: string | Array<string>): any => (props: Props = {}) =>
  get(props.theme, path, get(theme, path))

/**
 * Shorthand to `key(['fonts', path])`
 * @example
 * const Button = styled.button`
 *  font-family: ${font('primary')};
 * `
 */
export const font = (path: string): Font => key(['fonts', path])

/**
 * Shorthand to `key(['sizes', path])`
 * @example
 * const Button = styled.button`
 *  padding: ${size('padding')};
 * `
 */
export const size = (path: string): Size => key(['sizes', path])

/**
 * Returns the value of `props.theme[palette || reversePalette][path][index]` or
 * `styledTheme[palette || reversePalette][path][index]` (default theme)
 *
 * The arguments can be passed in any order, as long as types are kept.
 * @param {number} index The index of tone in theme palette tones array
 * @param {string} [path=`props.palette`] The key of the tones in theme palette object
 * @param {Object} [exceptions] An object with path as key and index as value
 * @param {boolean} [reverse] Flag to return tone from `reversePalette` or `palette`
 * @example
 * // index = 1
 * // exception = { grayscale: 0 }
 * // reverse = true
 * const Button = styled.button`
 *  background-color: ${palette({ grayscale: 0 }, 1, true)};
 * `
 *
 * // renders props.theme.reversePalette.grayscale[0]
 * <Button palette="grayscale" />
 *
 * // renders props.theme.palette.danger[1] (nullify reverse)
 * <Button palette="danger" reverse />
 * @returns {Tones}
 */
export const palette = (...args) => (props: Props = {}): Tones => {
  const exceptions = args.find(arg => typeof arg === 'object') || {}
  const path = args.find(arg => typeof arg === 'string') || props.palette
  let index = args.find(arg => typeof arg === 'number')
  let reverse = args.find(arg => typeof arg === 'boolean')
  reverse = reverse ? !props.reverse : props.reverse

  if (typeof index === 'undefined') {
    throw new Error('[palette] You must pass index')
  }
  if (typeof path === 'undefined') {
    throw new Error('[palette] You must pass palette path')
  }

  if (Object.keys(exceptions).indexOf(path) >= 0) {
    index = exceptions[path]
  }

  const palettePath = reverse ? 'reversePalette' : 'palette'
  return key([palettePath, path, index])(props)
}

/**
 * Returns pass if prop is truthy. Otherwise returns fail
 * @example
 * const Button = styled.button`
 *  background-color: ${ifProp('transparent', 'transparent', palette(0))};
 *  color: ${ifProp(['transparent', 'accent'], palette('secondary', 0))};
 *  font-size: ${ifProp({ size: 'large' }, '20px', ifProp({ size: 'medium' }, '16px', '12px'))};
 *`
 */
export const ifProp = (
  needle: string | string[] | Object,
  pass?: any,
  fail?: any
) => (props = {}) => {
  let result
  if (Array.isArray(needle)) {
    result = !at(props, needle).filter(value => !value).length
  } else if (typeof needle === 'object') {
    const needleKeys = Object.keys(needle)
    const needleValues = values(needle)
    result = !difference(at(props, needleKeys), needleValues).length
  } else {
    result = get(props, needle)
  }
  return result ? pass : fail
}

export default theme
