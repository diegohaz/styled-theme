import theme from '../src/theme'
import { key, font, palette, size } from '../src'

describe('key', () => {
  const theme2 = {
    foo: 'bar'
  }

  it('returns value from theme when no anotherTheme was passed in', () => {
    expect(key('palette')()).toBe(theme.palette)
  })

  it('returns value from anotherTheme when passed in', () => {
    expect(key('foo')({ theme: theme2 })).toBe(theme2.foo)
  })

  it('returns defaultValue', () => {
    expect(key('foo', 'baz')()).toBe('baz')
  })
})

describe('size', () => {
  const theme2 = {
    sizes: {
      foo: 'bar'
    }
  }

  it('returns value from theme when no anotherTheme was passed in', () => {
    expect(size('maxWidth')()).toBe(theme.sizes.maxWidth)
  })

  it('returns value from anotherTheme when passed in', () => {
    expect(size('foo')({ theme: theme2 })).toBe(theme2.sizes.foo)
  })

  it('returns defaultValue', () => {
    expect(size('foo', 'baz')()).toBe('baz')
  })
})

describe('font', () => {
  const theme2 = {
    fonts: {
      foo: 'bar',
      pre: 'test'
    }
  }

  it('returns default font when no anotherTheme was passed in', () => {
    expect(font('primary')()).toBe(theme.fonts.primary)
  })

  it('returns default font when it does not exist on anotherTheme', () => {
    expect(font('primary')({ theme: theme2 })).toBe(theme.fonts.primary)
    expect(font('quote')({ theme: theme2 })).toBe(theme.fonts.quote)
  })

  it('returns anotherTheme font when it exists', () => {
    expect(font('foo')({ theme: theme2 })).toBe(theme2.fonts.foo)
    expect(font('pre')({ theme: theme2 })).toBe(theme2.fonts.pre)
  })

  it('returns defaultValue', () => {
    expect(font('foo', 'baz')()).toBe('baz')
  })
})

describe('palette', () => {
  const theme2 = {
    palette: {
      foo: ['bar', 'baz']
    },
    reversePalette: {
      foo: ['baz', 'bar']
    }
  }

  it('throws when no index was passed in', () => {
    expect(() => palette()({ theme: theme2, palette: 'primary' })).toThrow()
  })

  it('throws when no palette was passed in', () => {
    expect(() => palette(0)({ theme: theme2 })).toThrow()
  })

  it('returns palette at index when palette was passed in with props', () => {
    expect(palette(0)({ theme: theme2, palette: 'primary' })).toBe(theme.palette.primary[0])
    expect(palette(0)({ theme: theme2, palette: 'foo' })).toBe(theme2.palette.foo[0])
    expect(palette(0)({ theme: theme2, palette: 'danger', reverse: true }))
      .toBe(theme.reversePalette.danger[0])
  })

  it('returns palette at index when palette was passed in with args ignoring props', () => {
    expect(palette('danger', 1)()).toBe(theme.palette.danger[1])
    expect(palette('danger', 1)({ theme: theme2 })).toBe(theme.palette.danger[1])
    expect(palette('danger', 1)({ theme: theme2, palette: 'foo' })).toBe(theme.palette.danger[1])
    expect(palette('danger', 1)({ theme: theme2, reverse: true }))
      .toBe(theme.reversePalette.danger[1])
  })

  it('returns palette at proper index when exception was passed in', () => {
    expect(palette(1, { danger: 0 })({ theme: theme2, palette: 'foo' })).toBe(theme2.palette.foo[1])
    expect(palette(1, { danger: 0 })({ theme: theme2, palette: 'danger' }))
      .toBe(theme.palette.danger[0])
  })

  it('returns reverse palette when true argument is passed in', () => {
    expect(palette(1, true)({ theme: theme2, palette: 'foo' })).toBe(theme2.reversePalette.foo[1])
    expect(palette(1, true)({ theme: theme2, palette: 'foo', reverse: true }))
      .toBe(theme2.palette.foo[1])
    expect(palette(1, true)({ theme: theme2, palette: 'danger' }))
      .toBe(theme.reversePalette.danger[1])
  })

  it('returns defaultValue', () => {
    expect(palette('foo', 1, 'red')()).toBe('red')
    expect(palette('foo', 1, 'red')({ theme: theme2 })).toBe(theme2.palette.foo[1])
  })
})
