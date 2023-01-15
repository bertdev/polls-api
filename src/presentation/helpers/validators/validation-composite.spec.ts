import { ValidationComposite } from './validation-composite'
import { Validation } from '../../protocols'
import { MissingParamError } from '../../errors'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
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
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValue(new Error('any_error'))
    const error = sut.validate({ ok: 'ok' })
    expect(error).toEqual(new Error('any_error'))
  })

  test('Should return first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error('any_error'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ ok: 'ok' })
    expect(error).toEqual(new Error('any_error'))
  })

  test('Should return null on success', () => {
    const { sut } = makeSut()
    const result = sut.validate({ ok: 'ok' })
    expect(result).toBeNull()
  })
})
