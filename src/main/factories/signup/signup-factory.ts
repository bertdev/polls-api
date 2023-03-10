import { SignUpController } from './../../../presentation/conttollers/signup/signup-controller'
import { DbAddAccountUseCase } from './../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from './../../../infra/cryptogaphy/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from './../../../infra/db/mongodb/account/account-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from './../../decorators/log-controller-decorator'
import { LogMongoRepository } from './../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter()
  const dbAddAccountUseCase = new DbAddAccountUseCase(
    bcryptAdapter,
    accountMongoRepository
  )
  const validationComposite = makeSignUpValidation()
  const signUpController = new SignUpController(
    dbAddAccountUseCase,
    validationComposite
  )
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
