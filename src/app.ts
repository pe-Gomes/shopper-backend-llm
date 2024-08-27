import app from './http/server'
import { env } from './env'

app
  .listen({ port: env.PORT, host: env.HOST })
  .then(() => console.log('Server running!'))
  .catch((err) => {
    console.error('error starting server:', err)
    process.exit(1)
  })
