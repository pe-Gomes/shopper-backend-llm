import { type CreateMeasurementInput } from '@/types/measurement'
import { type MeasurementRepository } from './interfaces'
import { db } from '@/infra/db'
import { measurements } from '@/infra/db/schema'
import { and, eq } from 'drizzle-orm'
import dayjs from 'dayjs'

export class DrizzleMeasurementRepository implements MeasurementRepository {
  async create(data: CreateMeasurementInput) {
    const [measurement] = await db.insert(measurements).values(data).returning()
    return measurement
  }

  async findById(id: string) {
    const measurement = await db.query.measurements.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    })

    return measurement ?? null
  }

  async findByCostumerCodeAndDatetimeMonth({
    costumerCode,
    measureDatetime,
    measureType,
  }: {
    costumerCode: string
    measureDatetime: Date
    measureType: 'WATER' | 'GAS'
  }) {
    const firstDayOfMonth = dayjs(new Date(measureDatetime))
      .startOf('month')
      .toDate()
    const lastDayOfMonth = dayjs(new Date(measureDatetime))
      .endOf('month')
      .toDate()

    const measurement = await db.query.measurements.findFirst({
      where: (table, { and, eq, lte, gte }) =>
        and(
          eq(table.costumerCode, costumerCode),
          eq(table.measureType, measureType),
          gte(table.measureDatetime, firstDayOfMonth),
          lte(table.measureDatetime, lastDayOfMonth)
        ),
    })
    return measurement ?? null
  }

  async confirmMeasurementValue({
    measureValue,
    measureId,
  }: {
    measureValue: number
    measureId: string
  }) {
    const [updated] = await db
      .update(measurements)
      .set({ measureValue, isConfirmed: true })
      .where(eq(measurements.id, measureId))
      .returning()

    return updated
  }

  async listByCostumerCodeAndMeasureType(search: {
    costumerCode: string
    measureType?: 'WATER' | 'GAS'
  }) {
    if (!search.measureType) {
      return await db
        .select()
        .from(measurements)
        .where(eq(measurements.costumerCode, search.costumerCode))
    }

    return await db
      .select()
      .from(measurements)
      .where(
        and(
          eq(measurements.costumerCode, search.costumerCode),
          eq(measurements.measureType, search.measureType)
        )
      )
  }
}
