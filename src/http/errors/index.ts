import { type ZodError } from 'zod'

type AppErrorDescription = string | string[] | Record<string, unknown>

export class AppError extends Error {
  private errorDescription: AppErrorDescription
  readonly errorCode!: string
  readonly statusCode!: number

  constructor(errorDescription?: AppErrorDescription) {
    super()
    this.errorDescription =
      errorDescription ?? 'Algo deu errado, tente novamente.'
  }

  format() {
    return {
      error_code: this.errorCode,
      error_description: this.errorDescription,
    }
  }
}

export class InvalidDataError extends AppError {
  readonly errorCode = 'INVALID_DATA'
  readonly statusCode = 400

  constructor(validationErr: ZodError) {
    super(validationErr.flatten().fieldErrors)
  }
}

export class DoubleReportError extends AppError {
  readonly errorCode = 'DOUBLE_REPORT'
  readonly statusCode = 409

  constructor() {
    super('Leitura do mês já realizada.')
  }
}

export class ConfirmationDuplicateError extends AppError {
  readonly errorCode = 'CONFIRMATION_DUPLICATE'
  readonly statusCode = 409
  constructor() {
    super('Leitura do mês já realizada.')
  }
}

export class MeasureNotFoundError extends AppError {
  readonly errorCode = 'MEASURE_NOT_FOUND'
  readonly statusCode = 404

  constructor() {
    super('Leitura do mês já realizada.')
  }
}

export class MeasuresNotFoundError extends AppError {
  readonly errorCode = 'MEASURES_NOT_FOUND'
  readonly statusCode = 404
  constructor() {
    super('Nenhuma leitura encontrada.')
  }
}

export class InvalidTypeError extends AppError {
  readonly errorCode = 'INVALID_TYPE'
  readonly statusCode = 400
  constructor() {
    super('Tipo de medição não permitida')
  }
}

export class InternalError extends AppError {
  readonly errorCode = 'INTERNAL_ERROR'
  readonly statusCode = 500
}
