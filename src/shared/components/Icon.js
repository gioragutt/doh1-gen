/* eslint-disable react/no-danger */
// @flow
import React from 'react'

const icons = require.context('shared/style/images/', true, /^\.\/.*\.svg$/)

type Props = {
  name: string,
  style: any,
  className: string
}

export default ({name, style, className}: Props) => (
  <i
    style={style}
    className={className}
    dangerouslySetInnerHTML={{__html: icons(`./${name}.svg`)}}
  />
)
