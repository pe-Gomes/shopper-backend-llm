import { pgTable, uuid, text, index, uniqueIndex } from 'drizzle-orm/pg-core'

export const costumers = pgTable(
  'costumers',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    costumerCode: text('costumer_code').notNull().unique(),
  },
  // Callback function to create indexes and constraints to the table
  (table) => ({
    uniqueCostumerCode: uniqueIndex('unique_costumer_code_constraint').on(
      table.costumerCode
    ),
    costumerCodeIndex: index('costumer_code_idx').on(table.costumerCode),
  })
)
