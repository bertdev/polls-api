import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposit with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
    requiredFields.forEach(fieldName => {
      validations.push(new RequiredFieldValidation(fieldName))
    })
    const compareFieldsValidation = new CompareFieldsValidation('password', 'confirmationPassword')
    validations.push(compareFieldsValidation)
    const emailValidator = makeEmailValidator()
    const emailValidation = new EmailValidation('email', emailValidator)
    validations.push(emailValidation)
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
