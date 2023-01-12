import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
  requiredFields.forEach(fieldName => {
    validations.push(new RequiredFieldValidation(fieldName))
  })
  const compareFieldsValidation = new CompareFieldsValidation('password', 'confirmationPassword')
  validations.push(compareFieldsValidation)
  return new ValidationComposite(validations)
}
