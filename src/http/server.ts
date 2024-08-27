import Fastify from 'fastify'

const server = Fastify()

server.get('/status', async (req, res) => {
  res.send({ message: 'ok' })
})

export default server
