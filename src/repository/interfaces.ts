import type { Costumer, CreateCostumerInput } from '@/types/costumer'
import type { Measurement, CreateMeasurementInput } from '@/types/measurement'

export interface CostumerRepository {
  create(data: CreateCostumerInput): Promise<Costumer>
  findByCostumerCode(costumerCode: string): Promise<Costumer | null>
}

export interface MeasurementRepository {
  create(data: CreateMeasurementInput): Promise<Measurement>
  listByCostumerCodeAndMeasureType(search: {
    costumerCode: string
    measureType?: 'WATER' | 'GAS'
  }): Promise<Measurement[]>
}
