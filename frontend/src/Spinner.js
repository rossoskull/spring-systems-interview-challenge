import React from 'react'
import { Spinner as BootstrapSpinner } from 'react-bootstrap'

const Spinner = () => {
  return (
    <div className='loader-overlay'>
      <BootstrapSpinner animation='grow' />
    </div>
  )
}

export default Spinner
