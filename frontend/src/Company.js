import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  Card,
  Container,
  Button,
  ListGroup,
  Form
} from 'react-bootstrap'

import Axios from './Axios'
import Spinner from './Spinner'

const Company = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [company, setCompany] = useState(undefined)

  const { id } = useParams()

  useEffect(() => {
    fetchCompanyDetails()
  }, [])

  const fetchCompanyDetails = async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`/company/${id}`)
      setCompany(data)
      console.log(data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  if (error) {
    return <Navigate to='/404' />
  }

  const addEmployee = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const firstName = e.target.first_name.value
      const lastName = e.target.last_name.value

      await Axios.post('/employee', {
        employer_id: id,
        first_name: firstName,
        last_name: lastName
      })

      fetchCompanyDetails()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Container>
      {company && (
        <Card>
          <Card.Header><Card.Title>{company.name}</Card.Title></Card.Header>
          <Card.Body>
            <p>Address: {company.address}</p>
            <p>Pin Code: {company.pin_code}</p>

            <h3>Employees</h3>
            <ListGroup>
              {company.employees.map((employee) => {
                return (
                  <ListGroup.Item key={employee.id}>{employee.first_name} {employee.last_name}</ListGroup.Item>
                )
              })}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Link to='/'><Button>Back</Button></Link>
          </Card.Footer>
        </Card>
      )}

      <Card className="mt-4 mb-4">
        <Card.Body>

          <Form onSubmit={addEmployee}>
            <h2>Add an employee</h2>

            <Form.Label>First Name</Form.Label>
            <Form.Control
              name='first_name'
              className='mb-3'
              type='text'
              placeholder="Employee's first name"
              required
            />

            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name='last_name'
              className='mb-3'
              type='text'
              placeholder="Employee's last name"
            />

            <Button variant='dark' type='submit'>Submit</Button>
          </Form>
        </Card.Body>
      </Card>

      {loading && <Spinner />}
    </Container>
  )
}

export default Company
