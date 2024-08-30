import { InvalidDataError } from '@/http/errors'
import { makeNewMeasurementFromImage } from '@/service/factory/make-new-measurement-from-image'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

const uploadRequestSchema = z.object({
  image: z.string().base64(),
  costumer_code: z.string().min(1),
  measure_datetime: z.string().datetime(),
  measure_type: z.enum(['WATER', 'GAS']),
})

export async function handleUpload(req: FastifyRequest, res: FastifyReply) {
  const body = uploadRequestSchema.safeParse(req.body)

  if (!body.success) {
    throw new InvalidDataError(body.error)
  }

  const service = makeNewMeasurementFromImage()

  const measure = await service.execute({
    costumerCode: body.data.costumer_code,
    measureDatetime: new Date(body.data.measure_datetime),
    image: body.data.image,
    measureType: body.data.measure_type,
  })

  await res.status(200).send({
    image_url: measure.measureImage,
    measule_value: measure.measureValue,
    measure_uuid: measure.id,
  })
}
