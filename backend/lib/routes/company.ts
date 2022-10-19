import express from 'express'
import client from '../prisma'
import z from 'zod'

const companySchema = z.object({
  name: z.string(),
  address: z.string(),
  pin_code: z.string().length(6)
})

const companyEditSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  pin_code: z.string().length(6).optional()
})

const router = express.Router()

// add a company
router.post('/', async (request, response, next) => {
  try {
    const data = request.body

    // check if the data sent matches schema
    companySchema.parse(data)

    const newCompany = await client.company.create({ data })

    response.status(201).send(newCompany)
    next()
  } catch (error) {
    console.error(error)
    response.status(500).send('An error occured')
    next()
  }
})

// get list of companies
router.get('/', async (_, response, next) => {
  try {
    const companies = await client.company.findMany()

    response.status(200).send({
      companies,
      total: companies.length
    })

    next()
  } catch (error) {
    console.error(error)
    response.status(500).send('An error occured')
    next()
  }
})

// get details of a single company
router.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id

    // check if the type if id is string
    z.string().parse(id)

    const company = await client.company.findUniqueOrThrow({
      where: {
        id
      }
    })

    response.status(200).send(company)

    next()
  } catch (error) {
    console.error(error)
    response.status(500).send('An error occured')
    next()
  }
})

// update a company's details
router.patch('/:id', async (request, response, next) => {
  try {
    const data = request.body
    const id = request.params.id

    // validate body and id
    companyEditSchema.parse(data)
    z.string().parse(id)

    // remove empty strings from the body if present
    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key].length === 0) {
        delete data[key]
      }
    })

    const editedCompany = await client.company.update({
      where: { id },
      data
    })

    response.status(200).send(editedCompany)

    next()
  } catch (error) {
    console.error(error)
    response.status(500).send('An error occured')
    next()
  }
})

export default router
