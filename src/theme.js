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
