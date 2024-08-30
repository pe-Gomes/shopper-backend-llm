import { type measurements } from '@/infra/db/schema'

export type Measurement = typeof measurements.$inferSelect

export type CreateMeasurementInput = typeof measurements.$inferInsert
