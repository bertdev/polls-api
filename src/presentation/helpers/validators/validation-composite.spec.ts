import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValue(new Error('any_error'))
    const error = sut.validate({ ok: 'ok' })
    expect(error).toEqual(new Error('any_error'))
  })

  test('Should return null on success', () => {
    const { sut } = makeSut()
    const result = sut.validate({ ok: 'ok' })
    expect(result).toBeNull()
  })
})
