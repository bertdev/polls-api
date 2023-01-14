import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from './../../errors'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('email')
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toBeInstanceOf(MissingParamError)
  })

  test('Should return null on success', () => {
    const { sut } = makeSut()
    const result = sut.validate({ email: 'any_email@mail.com' })
    expect(result).toBeNull()
  })
})
