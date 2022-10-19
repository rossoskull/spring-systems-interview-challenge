import express from 'express'
import client from '../prisma'
import z from 'zod'

// request body schemas
const employeeSchema = z.object({
  employer_id: z.string(),
  first_name: z.string(),
  last_name: z.string()
})

const router = express.Router()

// add employee to a company
router.post('/', async (request, response, next) => {
  try {
    const data = employeeSchema.parse(request.body)

    const company = await client.company.findUniqueOrThrow({
      where: { id: data.employer_id }
    })

    const employee = await client.employee.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        employer_id: company.id
      }
    })

    response.status(201).send(employee)

    next()
  } catch (error) {
    console.error(error)
    response.status(500).send('An error occured')
    next()
  }
})

export default router
