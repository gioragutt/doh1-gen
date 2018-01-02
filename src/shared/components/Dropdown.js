import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {withStateHandlers} from 'recompose'

const defaultStyle = {
  borderRadius: '3px',
  border: 'solid 1px #dee3e8',
  fontSize: '14px',
  color: '#556b7c',
}

const Dropdown = ({
  selectItem,
  options,
  selectedVal,
  style = {},
  clearable = false,
  searchable = false,
  ...rest
}) => (
  <Select
    style={{...defaultStyle, ...style}}
    value={selectedVal}
    options={options}
    onChange={selectItem}
    clearable={clearable}
    searchable={searchable}
    {...rest}
  />
)

const enhance = withStateHandlers(
  ({options}) => ({
    selectedVal: options ? options[0].value : '',
  }),
  {
    selectItem: _ => value => ({
      selectedVal: value || '',
    }),
  }
)

export default enhance(Dropdown)
