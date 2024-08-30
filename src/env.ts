import { z } from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(8080),
  HOST: z.coerce.string().default('0.0.0.0'),
  DATABASE_HOST: z.coerce.string().default('localhost'),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().default('admin'),
  DATABASE_PASSWORD: z.string().default('changeme'),
  DATABASE_NAME: z.string().default('measurements_llm'),
  GEMINI_API_KEY: z.string(),
})

const parsedEnv = environmentSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
})

if (!parsedEnv.success) {
  console.error(
    'error while reading environment variables:\n',
    parsedEnv.error.errors
  )
  process.exit(1)
}

export const env = parsedEnv.data
