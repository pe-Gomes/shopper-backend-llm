import { DrizzleCostumerRepository } from '@/repository/costumer-repository'
import { DrizzleMeasurementRepository } from '@/repository/measurement-repository'
import { NewMeasurementFromImageService } from '../upload/new-measurement-from-image'

export function makeNewMeasurementFromImage() {
  const measurementRepository = new DrizzleMeasurementRepository()
  const costumerRepository = new DrizzleCostumerRepository()

  return new NewMeasurementFromImageService(
    measurementRepository,
    costumerRepository
  )
}
