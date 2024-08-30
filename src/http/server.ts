import Fastify from 'fastify'
import { appRoutes } from './routes'
import { AppError } from './errors'

const server = Fastify()

server.get('/status', async (_, res) => {
  await res.send({ message: 'ok' })
})

void server.register(appRoutes)

server.setErrorHandler(async (err, _, res) => {
  console.error(err)
  if (err instanceof AppError) {
    await res.status(err.statusCode).send(err.format())
  }

  await res.status(500).send({
    error_code: 'INTERNAL_ERROR',
    error_description: 'Algo deu errado, tente novamente.',
  })
})

export default server
