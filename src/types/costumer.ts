import { type costumers } from '@/infra/db/schema'

export type Costumer = typeof costumers.$inferSelect

export type CreateCostumerInput = typeof costumers.$inferInsert
