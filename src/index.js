import get from 'lodash/get'
import at from 'lodash/at'
import values from 'lodash/values'
import difference from 'lodash/difference'
import theme from './theme'

export const key = path => (props = {}) => get(props.theme, path, get(theme, path))

export const font = path => key(['fonts', path])

export const size = path => key(['sizes', path])

export const palette = (...args) => (props = {}) => {
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

export const ifProp = (needle, pass, fail) => (props = {}) => {
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
