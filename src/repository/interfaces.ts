import type { Costumer, CreateCostumerInput } from '@/types/costumer'
import type { Measurement, CreateMeasurementInput } from '@/types/measurement'

export interface CostumerRepository {
  create(data: CreateCostumerInput): Promise<Costumer>
  findByCostumerCode(costumerCode: string): Promise<Costumer | null>
}

export interface MeasurementRepository {
  create(data: CreateMeasurementInput): Promise<Measurement>

  findById(uuid: string): Promise<Measurement | null>

  findByCostumerCodeAndDatetimeMonth({
    costumerCode,
    measureDatetime,
    measureType,
  }: {
    costumerCode: string
    measureDatetime: Date
    measureType: 'WATER' | 'GAS'
  }): Promise<Measurement | null>

  confirmMeasurementValue({
    measureValue,
    measureId,
  }: {
    measureValue: number
    measureId: string
  }): Promise<Measurement>

  listByCostumerCodeAndMeasureType(search: {
    costumerCode: string
    measureType?: 'WATER' | 'GAS'
  }): Promise<Measurement[]>
}
