import env from './../../config/env'
import { Controller } from './../../../presentation/protocols'
import { LoginController } from './../../../presentation/conttollers/login/login-controller'
import { LogControllerDecorator } from './../../decorators/log-controller-decorator'
import { LogMongoRepository } from './../../../infra/db/mongodb/log/log-mongo-repository'
import { DbAuthentication } from './../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from './../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from './../../../infra/cryptogaphy/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from './../../../infra/cryptogaphy/jwt-adapter/jwt-adapter'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
