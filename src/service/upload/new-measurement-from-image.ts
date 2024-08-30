import { InternalError } from '@/http/errors'
import {
  type CostumerRepository,
  type MeasurementRepository,
} from '@/repository/interfaces'
import type { Costumer } from '@/types/costumer'
import { saveFileFromBase64Image } from '../gemini/save-file-from-base64-image'
import { analyseUploadedFile } from '../gemini/analyse-uploaded-file'

type NewMeasurementFromImageRequest = {
  image: string
  costumerCode: string
  measureDatetime: Date
  measureType: 'WATER' | 'GAS'
}

export class NewMeasurementFromImageService {
  constructor(
    private measurementRepository: MeasurementRepository,
    private costumerRepository: CostumerRepository
  ) {}

  async execute(data: NewMeasurementFromImageRequest) {
    const costumerExists = await this.costumerRepository.findByCostumerCode(
      data.costumerCode
    )

    let newCostumer: Costumer | undefined

    if (!costumerExists) {
      newCostumer = await this.costumerRepository.create({
        costumerCode: data.costumerCode,
      })
    }

    const costumer = costumerExists ?? newCostumer

    if (!costumer) {
      console.error('costumer undefined on NewMeasurementFromImageService')
      throw new InternalError()
    }

    const file = await saveFileFromBase64Image({
      costumerCode: costumer.costumerCode,
      base64Image: data.image,
    })

    const billConsumption = await analyseUploadedFile(file.uri)

    const consumptionNumber = parseFloat(billConsumption)

    // Check if number was successfully generated and parsed (case is NaN)
    if (!consumptionNumber) {
      console.error(
        'consumptionNumber is NaN on NewMeasurementFromImageService'
      )
      throw new InternalError()
    }

    const measurement = await this.measurementRepository.create({
      costumerCode: costumer.costumerCode,
      measureDatetime: data.measureDatetime,
      measureType: data.measureType,
      measureValue: consumptionNumber,
      measureImage: file.uri,
    })

    return measurement
  }
}
