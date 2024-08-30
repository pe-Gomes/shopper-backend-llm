import app from './http/server'
import { env } from './env'
import { initDB } from './infra/db/migrate'

if (env.NODE_ENV === 'production') {
  initDB()
    .then(() => console.log('Database migrated!'))
    .catch((err) => {
      console.error('DB initialization failed:', err)
      process.exit(1)
    })
}

app
  .listen({ port: env.PORT, host: env.HOST })
  .then(() => console.log('Server running!'))
  .catch((err) => {
    console.error('error starting server:', err)
    process.exit(1)
  })
