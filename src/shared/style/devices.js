// @flow

import {css} from 'emotion'
import {mapValues} from 'lodash'

type Devices = {
  desktop: any,
  tablet: any,
  mobile: any
}

/**
 * Generally we suppose to use the most common responsive breakpoints,
 * which were designed based on device resolution statistics
 * */
export const breakpoints: Devices = {
  desktop: 1368,
  tablet: 768,
  mobile: 480,
}

export const mediaQuery = (spec: string) => (...args: any[]) => css`
  @media (${spec}) {
    ${css(...args)};
  }
`

const createMedia = type =>
  mapValues(breakpoints, point => mediaQuery(`${type}: ${point}px`))

export const upToMedia: Devices = createMedia('max-width')

const fromMedia: Devices = createMedia('min-width')

export default fromMedia
