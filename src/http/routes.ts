import { type FastifyInstance } from 'fastify'
import { handleUpload } from '@/controller/upload'

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post('/upload', handleUpload)
}
