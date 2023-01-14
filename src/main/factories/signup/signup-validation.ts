import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

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
