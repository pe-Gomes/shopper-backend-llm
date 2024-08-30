import { env } from '@/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

export async function initDB() {
  const databaseConfig = {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  }

  const sql = postgres({ ...databaseConfig, max: 1 })
  const migrationDB = drizzle(sql)

  await migrate(migrationDB, { migrationsFolder: 'drizzle' })
  await sql.end()
}
