import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, EmailValidation, RequiredFieldValidation } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['email', 'password']
  requiredFields.forEach(fieldName => {
    validations.push(new RequiredFieldValidation(fieldName))
  })
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const emailValidation = new EmailValidation('email', emailValidatorAdapter)
  validations.push(emailValidation)
  return new ValidationComposite(validations)
}
