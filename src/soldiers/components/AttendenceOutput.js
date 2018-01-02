import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import {Button, FormGroup, FormControl} from 'react-bootstrap'

import isMobile from '../utils/platform'

const report1Output = soldiers =>
  soldiers
    .map(s => `*${s.name.trim()}:* ${s.attendence}`)
    .join('\n')

const MobileOutput = ({soldiers}) => (
  <FormGroup controlId="formControlsTextarea">
    <FormControl
      componentClass="textarea"
      placeholder="העתק דוח1"
      value={report1Output(soldiers)}
      readOnly
      onClick={e => e.target.select()}
    />
  </FormGroup>
)

const DesktopOutput = ({soldiers}) => {
  const disabled = soldiers.length === 0
  const bsStyle = disabled ? 'default' : 'primary'

  return (
    <CopyToClipboard text={report1Output(soldiers)} onCopy={() => console.log('copied')}>
      <Button block {...{disabled, bsStyle}}>
        העתק דוח1
      </Button>
    </CopyToClipboard>
  )
}

const AttendenceOutput = ({soldiers}) => (isMobile()
  ? <MobileOutput {...{soldiers}}/>
  : <DesktopOutput {...{soldiers}}/>
)

export default AttendenceOutput
