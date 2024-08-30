import { DrizzleMeasurementRepository } from '@/repository/measurement-repository'
import { ConfirmMeasurementService } from '../measurement/confirm-measurement'

export function makeConfirmMeasurementService() {
  const measurementRepo = new DrizzleMeasurementRepository()
  return new ConfirmMeasurementService(measurementRepo)
}
