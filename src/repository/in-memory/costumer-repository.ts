import { Costumer, CreateCostumerInput } from '@/types/costumer'
import { CostumerRepository } from '../interfaces'
import { randomUUID } from 'node:crypto'

export class InMemoryCostumerRepository implements CostumerRepository {
  public costumers: Costumer[] = []

  async create(data: CreateCostumerInput) {
    const costumer = {
      ...data,
      id: randomUUID().toString(),
    }
    this.costumers.push(costumer)
    return Promise.resolve(costumer)
  }

  async findByCostumerCode(costumerCode: string): Promise<Costumer | null> {
    const filtered =
      this.costumers.find(
        (costumer) => costumer.costumerCode === costumerCode
      ) || null

    return Promise.resolve(filtered)
  }
}
