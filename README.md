# styled-theme 💅🏿

[![Greenkeeper badge](https://badges.greenkeeper.io/diegohaz/styled-theme.svg)](https://greenkeeper.io/)

[![Generated with nod](https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square)](https://github.com/diegohaz/nod)
[![NPM version](https://img.shields.io/npm/v/styled-theme.svg?style=flat-square)](https://npmjs.org/package/styled-theme)
[![Build Status](https://img.shields.io/travis/diegohaz/styled-theme/master.svg?style=flat-square)](https://travis-ci.org/diegohaz/styled-theme) [![Coverage Status](https://img.shields.io/codecov/c/github/diegohaz/styled-theme/master.svg?style=flat-square)](https://codecov.io/gh/diegohaz/styled-theme/branch/master)

Theming system for [styled-components 💅](https://github.com/styled-components/styled-components)

## Install

    $ npm install --save styled-theme

## Usage

Play with it on [WebpackBin](https://www.webpackbin.com/bins/-KeZfaFl3_761CAGa0CC)
```js
import styled from 'styled-components'
import { font, palette } from 'styled-theme' 

const Text = styled.span`
  font-family: ${font('primary')};
  background-color: ${palette(1)};
  color: ${palette('grayscale', 0, true)};
`

Text.defaultProps = {
  palette: 'primary'
}
```

```jsx
<Text>Hello</Text>
```

![image](https://cloud.githubusercontent.com/assets/3068563/21835155/f92c4a74-d7a1-11e6-85c1-93d6e447f98a.png)

```jsx
<Text reverse>Hello</Text>
```

![image](https://cloud.githubusercontent.com/assets/3068563/21835169/18b3ea28-d7a2-11e6-8f3f-2fc76c706f45.png)

```jsx
<Text palette="secondary">Hello</Text>
```

![image](https://cloud.githubusercontent.com/assets/3068563/21835195/350f4514-d7a2-11e6-9095-4e30d04b3d61.png)

### Provide your own theme

```jsx
import { ThemeProvider } from 'styled-components'

const xmasTheme = {
  fonts: {
    primary: 'Georgia, serif'
  },
  palette: {
    // red gradient
    primary: ['#D32F2F', '#F44336', '#F8877F', '#FFCDD2']
  }
}

<ThemeProvider theme={xmasTheme}>
  <Text>Hello</Text>
</ThemeProvider>
```

![image](https://cloud.githubusercontent.com/assets/3068563/21835499/a49b94bc-d7a4-11e6-9cf3-ab41519cd962.png)

## Default theme structure

This is the content of [`src/theme.js`](src/theme.js):

```js
import coolorsToHex from 'coolors-to-hex'
import { reversePalette } from './composer'

const theme = {}

theme.palette = {
  primary: coolorsToHex('https://coolors.co/1976d2-2196f3-71bcf7-97cef9-c2e2fb'),
  secondary: coolorsToHex('https://coolors.co/c2185b-e91e63-f06292-f48caf-f8bbd0'),
  danger: coolorsToHex('https://coolors.co/d32f2f-f44336-f8877f-f9a7a1-ffcdd2'),
  alert: coolorsToHex('https://coolors.co/ffa000-ffc107-ffd761-ffecb3-fff2ce'),
  success: coolorsToHex('https://coolors.co/388e3c-4caf50-7cc47f-9fd4a1-c8e6c9'),
  grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#ffffff']
}

theme.reversePalette = reversePalette(theme.palette)

theme.fonts = {
  primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif'
}

theme.sizes = {
  maxWidth: '1100px'
}

export default theme
```

[`reversePalette`](#reversePalette) is a helper method. Import it from `styled-theme/composer`.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### reversePalette

Revert the palette

**Parameters**

-   `palette` **[Palette](#palette)** 

**Examples**

```javascript
reversePalette({ primary: ['red', 'yellow', 'green'] })
// { primary: ['green', 'yellow', 'red'] }
```

Returns **[Palette](#palette)** 

### key

Returns the value of `props.theme[path]` or `styledTheme[path]`

**Parameters**

-   `path` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>)** 
-   `defaultValue` **any** 

**Examples**

```javascript
const Button = styled.button`
 font-family: ${key('fonts.primary')};
 color: ${key(['colors', 'primary', 0])};
`
```

Returns **any** 

### font

Shorthand to `key(['fonts', path])`

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `defaultValue` **any** 

**Examples**

```javascript
const Button = styled.button`
 font-family: ${font('primary')};
`
```

Returns **[Font](#font)** 

### size

Shorthand to `key(['sizes', path])`

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `defaultValue` **any** 

**Examples**

```javascript
const Button = styled.button`
 padding: ${size('padding')};
`
```

Returns **[Size](#size)** 

### palette

Returns the value of `props.theme[palette || reversePalette][path][index]` or
`styledTheme[palette || reversePalette][path][index]` (default theme)

The arguments can be passed in any order, as long as types are kept.

**Parameters**

-   `index` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index of tone in theme palette tones array
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** The key of the tones in theme palette object (optional, default `props.palette`)
-   `exceptions` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** An object with path as key and index as value
-   `reverse` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Flag to return tone from `reversePalette` or `palette`
-   `defaultValue` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** Default value
-   `args` **...any** 

**Examples**

```javascript
// index = 1
// exception = { grayscale: 0 }
// reverse = true
const Button = styled.button`
 background-color: ${palette({ grayscale: 0 }, 1, true)};
`

// renders props.theme.reversePalette.grayscale[0]
<Button palette="grayscale" />

// renders props.theme.palette.danger[1] (nullify reverse)
<Button palette="danger" reverse />
```

Returns **[Tones](#tones)** 

### Tone

Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### Tones

Type: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Tone](#tone)>

### Font

Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### Size

Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### Palette

Type: {}

### Fonts

Type: {}

### Sizes

Type: {}

### Theme

Type: {palette: [Palette](#palette)?, reversePalette: [Palette](#palette)?, fonts: [Fonts](#fonts)?, sizes: [Sizes](#sizes)?}

## Related

-   [styled-tools](https://github.com/diegohaz/styled-tools) - Utilities for styled-components (like lodash)

## License

MIT © [Diego Haz](https://github.com/diegohaz)
