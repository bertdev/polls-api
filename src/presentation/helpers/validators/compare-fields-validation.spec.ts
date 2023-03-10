import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('password', 'confirmationPassword')
}

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ passord: 'any_password', confirmationPassword: 'worng_password' })
    expect(error).toBeInstanceOf(InvalidParamError)
  })

  test('Should return null on success', () => {
    const sut = makeSut()
    const result = sut.validate({ password: 'any_password', confirmationPassword: 'any_password' })
    expect(result).toBeNull()
  })
})
