import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
} from 'drizzle-orm/pg-core'
import { costumers } from './costumers'

type MeasurementTypeOptions = 'WATER' | 'GAS'

export const measurements = pgTable('measurements', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  costumerCode: text('costumer_code').references(() => costumers.costumerCode, {
    onDelete: 'set null',
  }),
  measurementType: varchar('measurement_type', { length: 15 })
    .$type<MeasurementTypeOptions>()
    .notNull(),
  measureValue: integer('measure_value').notNull(),
  measureDatetime: timestamp('measure_datetime', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  measureImage: text('measure_image').notNull(),
  isConfirmed: boolean('is_confirmed').notNull().default(false),
})
