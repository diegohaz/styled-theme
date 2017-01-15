// @flow
/** */
export type Tone = string

/** */
export type Tones = Array<Tone>

/** */
export type Font = string

/** */
export type Size = string

/** */
export type Palette = {[string]: Tones}

/** */
export type Fonts = {[string]: Font}

/** */
export type Sizes = {[string]: Size}

/** */
export type Theme = {
  palette?: Palette,
  reversePalette?: Palette,
  fonts?: Fonts,
  sizes?: Sizes
}
