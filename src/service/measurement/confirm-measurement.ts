import { ConfirmationDuplicateError, MeasureNotFoundError } from '@/http/errors'
import { type MeasurementRepository } from '@/repository/interfaces'

type ConfirmMeasurementRequest = {
  measure_uuid: string
  confirmed_value: number
}

export class ConfirmMeasurementService {
  constructor(private measurementRepository: MeasurementRepository) {}

  async execute(data: ConfirmMeasurementRequest) {
    const measurement = await this.measurementRepository.findById(
      data.measure_uuid
    )

    if (!measurement) {
      throw new MeasureNotFoundError()
    }

    if (measurement.isConfirmed) {
      throw new ConfirmationDuplicateError()
    }

    await this.measurementRepository.confirmMeasurementValue({
      measureId: data.measure_uuid,
      measureValue: data.confirmed_value,
    })
  }
}
