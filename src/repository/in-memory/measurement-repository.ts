import { CreateMeasurementInput, Measurement } from '@/types/measurement'
import { MeasurementRepository } from '../interfaces'
import { randomUUID } from 'node:crypto'

export class InMemoryMeasurentRepository implements MeasurementRepository {
  public measurements: Measurement[] = []

  create(data: CreateMeasurementInput) {
    const measurement: Measurement = {
      ...data,
      costumerCode: data.costumerCode ?? null,
      isConfirmed: false,
      id: randomUUID().toString(),
    }

    this.measurements.push(measurement)

    return Promise.resolve(measurement)
  }

  listByCostumerCodeAndMeasureType(search: {
    costumerCode: string
    measurementType?: 'WATER' | 'GAS'
  }) {
    const filtered = this.measurements.filter((m) => {
      if (search.measurementType) {
        return (
          m.costumerCode === search.costumerCode &&
          m.measurementType === (search.measurementType as string)
        )
      }
      return m.costumerCode === search.costumerCode
    })

    return Promise.resolve(filtered)
  }
}
