import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
