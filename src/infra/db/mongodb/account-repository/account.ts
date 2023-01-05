import { AddAccountRepository } from './../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/use-cases/add-acount'
import { AccountModel } from '../../../../domain/models/account'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    return await new Promise((resolve) => resolve({
      id: 'any_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    }))
  }
}
