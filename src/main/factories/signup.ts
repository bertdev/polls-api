import { SignUpController } from './../../presentation/conttollers/signup/signup'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { DbAddAccountUseCase } from './../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from './../../infra/cryptogaphy/bcrypt-adapter'
import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from './../decorators/log'
import { LogMongoRepository } from './../../infra/db/mongodb/log-repository/log'

export const makeSignUpController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter()
  const dbAddAccountUseCase = new DbAddAccountUseCase(bcryptAdapter, accountMongoRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidator, dbAddAccountUseCase)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
