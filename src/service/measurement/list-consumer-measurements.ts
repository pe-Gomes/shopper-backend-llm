import { MeasuresNotFoundError } from '@/http/errors'
import { type MeasurementRepository } from '@/repository/interfaces'

type ListConsumerMeasurementsRequest = {
  costumerCode: string
  measureType: 'WATER' | 'GAS' | undefined
}

export class ListConsumerMeasurementsService {
  constructor(private measurementRepository: MeasurementRepository) {}
  async execute({
    costumerCode,
    measureType,
  }: ListConsumerMeasurementsRequest) {
    const measurements =
      await this.measurementRepository.listByCostumerCodeAndMeasureType({
        costumerCode,
        measureType,
      })

    if (measurements.length === 0) {
      throw new MeasuresNotFoundError()
    }

    return measurements
  }
}
