import {injectGlobal} from 'emotion'

const palette = {
  black: '#23303d',
  gray: '#f0f2f6',
  white: '#ffffff',
  azure: '#3498db',
  blueGrey: '#aebdc7',
  robinsEggBlue: '#9dd1f6',
  darkSkyBlue: '#48a5e5',
  periwinkleBlue: '#a7a9f7',
  lightGreenishBlue: '#67f0b1',
  slateTwo: '#556b7c',
  slateThree: '#526477',
  darkGreyBlue: '#274351',
  lightGreyBlue: '#c7d7e2',
  lightblue: '#67dcf0',
  paleGrey: '#dee3e8',
  darkSkyBlueTwo: '#3498db',
  coolGrey: '#8b97a2',
}

export default palette

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html, body, #root {
    width: 100%;
    height: 100%;
  }

  #root {
    margin: 0;
    padding: 0;
  }
  
  html, body {
    max-width: 660px;
    margin: auto;
  }
`
