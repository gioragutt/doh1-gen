import {css} from 'react-emotion'

export const styledScrolling = css`
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px white;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background-color: #ededed;
  }
`
