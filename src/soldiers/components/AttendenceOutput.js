import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import {Button, FormGroup, FormControl} from 'react-bootstrap'
import {branch, renderComponent, mapProps, compose} from 'recompose'

import isMobile from 'shared/utils/platform'

const report1Output = soldiers =>
  soldiers
    .map(s => `*${s.name.trim()}:* ${s.attendence}`)
    .join('\n')

const MobileOutput = ({text}) => (
  <FormGroup controlId="formControlsTextarea">
    <FormControl
      componentClass="textarea"
      placeholder="העתק דוח1"
      value={text}
      onChange={() => {}}
      onClick={e => e.target.select()}
    />
  </FormGroup>
)

const DesktopOutput = ({text, bsStyle, disabled}) => (
  <CopyToClipboard {...{text, onCopy: () => console.log('copied')}}>
    <Button block {...{disabled, bsStyle}}>
      העתק דוח1
    </Button>
  </CopyToClipboard>
)

const enhance = compose(
  mapProps(({soldiers: {length}, soldiers}) => {
    const disabled = length === 0
    return {
      disabled,
      bsStyle: disabled ? 'default' : 'primary',
      text: report1Output(soldiers),
    }
  }),
  branch(
    isMobile,
    renderComponent(MobileOutput),
    renderComponent(DesktopOutput),
  )
)

export default enhance()
