# styled-theme 💅🏿 
[![NPM version](https://img.shields.io/npm/v/styled-theme.svg?style=flat-square)](https://npmjs.org/package/styled-theme)
[![Build Status](https://img.shields.io/travis/diegohaz/styled-theme/master.svg?style=flat-square)](https://travis-ci.org/diegohaz/styled-theme) [![Coverage Status](https://img.shields.io/codecov/c/github/diegohaz/styled-theme/master.svg?style=flat-square)](https://codecov.io/gh/diegohaz/styled-theme/branch/master)

Theming system for [styled-components 💅](https://github.com/styled-components/styled-components)


## Install

```
$ npm install --save styled-theme
```


## Usage

Play with it on [WebpackBin](http://www.webpackbin.com/EkYUuq0BG)

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
import { coolors, reversePalette } from './composer'

const theme = {}

theme.palette = {
  primary: coolors('https://coolors.co/1976d2-2196f3-71bcf7-97cef9-c2e2fb'),
  secondary: coolors('https://coolors.co/c2185b-e91e63-f06292-f48caf-f8bbd0'),
  danger: coolors('https://coolors.co/d32f2f-f44336-f8877f-f9a7a1-ffcdd2'),
  alert: coolors('https://coolors.co/ffa000-ffc107-ffd761-ffecb3-fff2ce'),
  success: coolors('https://coolors.co/388e3c-4caf50-7cc47f-9fd4a1-c8e6c9'),
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

`coolors` and `reversePalette` are helper methods you can use. Just import them from `styled-theme/composer`.

## API

### `key(path: String|Array)`

Returns the value of `props.theme[path]` or `styledTheme[path]` (default theme)

```js
const Button = styled.button`
  font-family: ${key('fonts.primary')};
  color: ${key(['colors', 'primary', 0])};
`
```

### `font(path: String)`

Returns the value of `props.theme.fonts[path]` or `styledTheme.fonts[path]` (default theme)

```js
const Button = styled.button`
  font-family: ${font('primary')};
`
```

### `size(path: String)`

Returns the value of `props.theme.sizes[path]` or `styledTheme.sizes[path]` (default theme)

```js
const Wrapper = styled.div`
  max-width: ${size('maxWidth')};
`
```

### `palette(index: Int, path?: String, reverse?: Boolean, exceptions?: Object)`

Returns the value of `props.theme[palette || reversePalette][path][index]` or `styledTheme[palette || reversePalette][path][index]` (default theme)

The arguments can be passed in any order, as long as types are kept.

```jsx
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

### `ifProp(prop: String|Array|Object, pass?: Any, fail?: Any)`

Returns `pass` if `prop` is truthy. Otherwise returns `fail`.

```js
const Button = styled.button`
  background-color: ${ifProp('transparent', 'transparent', palette(0))};
  color: ${ifProp(['transparent', 'accent'], palette('secondary', 0))};
  font-size: ${ifProp({ size: 'large' }, '20px', ifProp({ size: 'medium' }, '16px', '12px'))};
`
```

## License

MIT © [Diego Haz](https://github.com/diegohaz)
