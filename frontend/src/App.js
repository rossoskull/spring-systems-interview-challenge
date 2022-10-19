import React, { useState, useEffect } from 'react'
import Axios from './Axios'

import './App.css'

import {
  Container,
  Form,
  Button,
  Card,
} from 'react-bootstrap'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'

function App() {
  const [companies, setCompanies] = useState([])
  const [totalCompanies, setTotalCompanies] = useState(0)
  const [loading, setLoading] = useState(false)

  // fetch list of companies when page is loaded
  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const { data } = await Axios.get('/company')

      setTotalCompanies(data.total)
      setCompanies(data.companies)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const addCompany = async (e) => {
    e.preventDefault()
    setLoading(true)

    console.log(e.target.checkValidity())

    try {
      const name = e.target.name.value
      const address = e.target.address.value
      const pin_code = e.target.pincode.value

      await Axios.post('/company', {
        name,
        address,
        pin_code
      })

      fetchCompanies()
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }


  return (
    <>
      <Container className="mt-3 mb-3">
        <Form onSubmit={addCompany}>
          <h2>Add a new company</h2>

          <Form.Label>Company Name</Form.Label>
          <Form.Control
            name='name'
            className='mb-3'
            type='text'
            placeholder='Enter your company name'
            required
          />

          <Form.Label>Address</Form.Label>
          <Form.Control
            name='address'
            className='mb-3'
            type='text'
            placeholder="Enter the company's address"
          />

          <Form.Label>Pin Code</Form.Label>
          <Form.Control
            name='pincode'
            className='mb-3'
            type='text'
            placeholder="Company's Pin Code"
          />

          <Button variant='dark' type='submit'>Submit</Button>
        </Form>
      </Container>
      <Container className="mt-3 mb-3">
        <h2>List of companies (Total: {totalCompanies})</h2>
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
          />
        ))}
      </Container>
      {loading && <Spinner />}
    </>
  );
}

const CompanyCard = ({ company }) => {
  return (
    <Card className="mt-4 mb-4">
      <Card.Header><Card.Title>{company.name}</Card.Title></Card.Header>
      <Card.Body>
        <p>Address: {company.address}</p>
        <p>Pin Code: {company.pin_code}</p>
        <p>Total employees: {company.employees_count}</p>
      </Card.Body>
      <Card.Footer>
        <Link to={`/company/${company.id}`}><Button>Details</Button></Link>
      </Card.Footer>
    </Card>
  )
}

export default App;
