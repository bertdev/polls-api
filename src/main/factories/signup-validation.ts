import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
  requiredFields.forEach(fieldName => {
    validations.push(new RequiredFieldValidation(fieldName))
  })
  return new ValidationComposite(validations)
}
