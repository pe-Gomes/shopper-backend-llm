import { InvalidDataError } from '@/http/errors'
import { makeConfirmMeasurementService } from '@/service/factory/make-confirm-measurement'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

const confirmMeasurementRequestSchema = z.object({
  measure_uuid: z.string().uuid(),
  confirmed_value: z.coerce.number(),
})

export async function handleConfirmMeasurement(
  req: FastifyRequest,
  res: FastifyReply
) {
  const body = confirmMeasurementRequestSchema.safeParse(req.body)
  if (!body.success) {
    throw new InvalidDataError(body.error)
  }

  const service = makeConfirmMeasurementService()

  await service.execute({
    measure_uuid: body.data.measure_uuid,
    confirmed_value: body.data.confirmed_value,
  })

  await res.status(200).send({
    success: true,
  })
}
