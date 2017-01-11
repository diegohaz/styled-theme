export const coolors = (url) =>
  url.replace(/^.+\/([^/]+)$/, '$1').split('-').map(hex => `#${hex}`)

export const reversePalette = palette =>
  Object.keys(palette).reduce((newPalette, key) => {
    newPalette[key] = [ ...palette[key] ].reverse()
    return newPalette
  }, {})
