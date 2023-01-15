import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposit with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    const requiredFields = ['email', 'password']
    requiredFields.forEach(fieldName => {
      validations.push(new RequiredFieldValidation(fieldName))
    })
    const emailValidator = makeEmailValidator()
    const emailValidation = new EmailValidation('email', emailValidator)
    validations.push(emailValidation)
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
