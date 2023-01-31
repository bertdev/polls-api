import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
  requiredFields.forEach(fieldName => {
    validations.push(new RequiredFieldValidation(fieldName))
  })
  const compareFieldsValidation = new CompareFieldsValidation('password', 'confirmationPassword')
  validations.push(compareFieldsValidation)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const emailValidation = new EmailValidation('email', emailValidatorAdapter)
  validations.push(emailValidation)
  return new ValidationComposite(validations)
}
