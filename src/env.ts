import { z } from 'zod'

const environmentSchema = z.object({
  PORT: z.coerce.number().default(8080),
  HOST: z.coerce.string().default('0.0.0.0'),
})

const parsedEnv = environmentSchema.safeParse({
  PORT: process.env.PORT,
  HOST: process.env.HOST,
})

if (!parsedEnv.success) {
  console.error(
    'error while reading environment variables:\n',
    parsedEnv.error.errors
  )
  process.exit(1)
}

export const env = parsedEnv.data
