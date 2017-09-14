import React, { Component } from 'react';

import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import * as platform from './platform';

const report1Output = (soldiers) => soldiers.map(s => `*${s.name.trim()}:* ${s.attendence}`).join('\n');

const decideOutput = (isMobile, soldiers, disableCopy, buttonStyle) => {
  if (isMobile) {
    return (<FormGroup controlId="formControlsTextarea">
        <FormControl
          componentClass="textarea"
          placeholder="העתק דוח1"
          value={report1Output(soldiers)}
          onClick={e => e.target.select()}
        />
      </FormGroup>); 
  }
  return (<CopyToClipboard text={report1Output(soldiers)}
        onCopy={() => console.log('copied')}>
        <Button block disabled={disableCopy} bsStyle={buttonStyle}>העתק דוח1</Button>
      </CopyToClipboard>) 
}

const AttendenceOutput = ({soldiers}) => {
  const disableCopy = soldiers.length === 0;
  const buttonStyle = disableCopy ? '' : 'primary';
  return decideOutput(platform.isMobile(), soldiers, disableCopy, buttonStyle);
};

export default AttendenceOutput;