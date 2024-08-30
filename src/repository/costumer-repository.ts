import { type CreateCostumerInput } from '@/types/costumer'
import { type CostumerRepository } from './interfaces'
import { db } from '@/infra/db'
import { costumers } from '@/infra/db/schema'

export class DrizzleCostumerRepository implements CostumerRepository {
  async create(data: CreateCostumerInput) {
    const [costumer] = await db.insert(costumers).values(data).returning()
    return costumer
  }

  async findByCostumerCode(costumerCode: string) {
    const costumer = await db.query.costumers.findFirst({
      where: (table, { eq }) => eq(table.costumerCode, costumerCode),
    })
    return costumer ?? null
  }
}
