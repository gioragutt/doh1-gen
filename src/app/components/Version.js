// @flow
import React from 'react'

const Version = ({hidden}: { hidden?: boolean }) => (
  <pre style={{display: hidden ? 'none' : undefined}}>
    {`
Package   : ${process.env.npm_package_version}
Commit    : ${process.env.COMMIT_HASH}
Build Date: ${process.env.BUILD_DATE}
`}
  </pre>
)

export default Version
