import { type FastifyInstance } from 'fastify'
import { handleUpload } from '@/controller/upload'
import { handleConfirmMeasurement } from '@/controller/confirm'
import { handleListMeasuresByCostumerCode } from '@/controller/list-measures'

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post('/upload', handleUpload)
  app.patch('/confirm', handleConfirmMeasurement)
  app.get('/:costumerCode/list', handleListMeasuresByCostumerCode)
}
