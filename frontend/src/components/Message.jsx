import React from 'react'
import { Alert } from 'react-bootstrap'

export default function Message({children,className}) {
  return (
    <Alert className={className}>
        {children}
    </Alert>
  )
}


