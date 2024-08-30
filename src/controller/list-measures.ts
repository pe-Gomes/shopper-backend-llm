import { InvalidDataError, InvalidTypeError } from '@/http/errors'
import { makeListConsumerMeasurements } from '@/service/factory/make-list-consumer-measurements'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  costumerCode: z.string(),
})

const queryParams = z.object({
  measure_type: z.enum(['WATER', 'GAS']).optional(),
})

type ResponseSchema = {
  costumer_code: string
  measures: {
    measure_uuid: string
    measure_datetime: string
    measure_type: 'WATER' | 'GAS'
    measure_value: number
    has_confirmed: boolean
    image_url: string
  }[]
}

export async function handleListMeasuresByCostumerCode(
  req: FastifyRequest,
  res: FastifyReply
) {
  const param = paramsSchema.safeParse(req.params)

  if (!param.success) {
    throw new InvalidDataError(param.error)
  }

  const query = queryParams.safeParse(req.query)

  if (!query.success) {
    throw new InvalidTypeError()
  }

  const service = makeListConsumerMeasurements()

  const measurements = await service.execute({
    costumerCode: param.data.costumerCode,
    measureType: query.data.measure_type,
  })

  const responseBody = {} as ResponseSchema
  responseBody.costumer_code = param.data.costumerCode
  responseBody.measures = []

  for (const measure of measurements) {
    responseBody.measures.push({
      measure_uuid: measure.id,
      measure_datetime: measure.measureDatetime.toISOString(),
      measure_type: measure.measureType,
      measure_value: measure.measureValue,
      has_confirmed: measure.isConfirmed,
      image_url: measure.measureImage,
    })
  }

  await res.status(200).send(responseBody)
}
