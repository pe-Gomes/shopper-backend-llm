import { DrizzleMeasurementRepository } from '@/repository/measurement-repository'
import { ListConsumerMeasurementsService } from '../measurement/list-consumer-measurements'

export function makeListConsumerMeasurements() {
  const measureRepo = new DrizzleMeasurementRepository()
  return new ListConsumerMeasurementsService(measureRepo)
}
