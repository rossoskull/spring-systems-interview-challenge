import React from 'react'
import {
  Navbar,
  Container,
  Nav
} from 'react-bootstrap'

const CustomNavbar = () => {
  return (
    <Navbar className='mb-3' variant='dark' bg='dark'>
      <Container>
        <Navbar.Brand>Company Manager App</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
